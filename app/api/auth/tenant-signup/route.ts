import bcrypt from "bcrypt";
import { Prisma, type PlanModule } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { resolveSubscriptionDates } from "@/lib/utils/billing";
import { tenantSignupSchema } from "@/lib/validators/tenant";

export async function POST(request: Request) {
  try {
    const payload = tenantSignupSchema.parse(await request.json());

    const plan = await prisma.plan.findUnique({
      where: { id: payload.planId },
      include: { planModules: true },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const moduleIds = payload.moduleIds.length
      ? payload.moduleIds
      : plan.planModules
          .filter((planModule: PlanModule) => planModule.included)
          .map((planModule) => planModule.moduleId);

    const now = new Date();
    const billingCycle = payload.billingCycle ?? plan.billingCycle;
    const subscriptionDates = resolveSubscriptionDates({
      start: now,
      cycle: billingCycle,
      trialDays: payload.trialDays,
    });

    const passwordHash = await bcrypt.hash(payload.adminPassword, 10);

    const result = await prisma.$transaction(async (tx) => {
      const createdTenant = await tx.tenant.create({
        data: {
          name: payload.name,
          slug: payload.slug,
          contactEmail: payload.contactEmail,
          contactPhone: payload.contactPhone,
          address: payload.address ?? undefined,
        },
      });

      if (moduleIds.length) {
        await tx.tenantModule.createMany({
          data: moduleIds.map((moduleId) => ({
            tenantId: createdTenant.id,
            moduleId,
            isActive: true,
          })),
          skipDuplicates: true,
        });
      }

      await tx.subscription.create({
        data: {
          tenantId: createdTenant.id,
          planId: plan.id,
          status: subscriptionDates.status,
          currentPeriodStart: subscriptionDates.currentPeriodStart,
          currentPeriodEnd: subscriptionDates.currentPeriodEnd,
          trialEndsAt: subscriptionDates.trialEndsAt,
          meta: {
            billingCycle,
            trialDays: payload.trialDays,
          },
        },
      });

      const adminUser = await tx.user.create({
        data: {
          email: payload.adminEmail,
          passwordHash,
          tenantId: createdTenant.id,
          role: Prisma.UserRole.HOSPITAL_ADMIN,
        },
      });

      const tenant = await tx.tenant.findUniqueOrThrow({
        where: { id: createdTenant.id },
        include: {
          subscription: { include: { plan: true } },
          modules: { include: { module: true } },
        },
      });

      return { tenant, admin: { id: adminUser.id, email: adminUser.email } };
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = Array.isArray(error.meta?.target) ? error.meta?.target.join(", ") : error.meta?.target;
      const conflictField = target?.toString().includes("email") ? "Admin email" : "Tenant slug";
      return NextResponse.json({ error: `${conflictField} already exists` }, { status: 409 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to complete signup" }, { status: 500 });
  }
}
