import { NextResponse } from "next/server";
import type { Prisma } from "@/app/generated/prisma/client";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { createTenantSchema } from "@/lib/validators/tenant";
import { resolveSubscriptionDates } from "@/lib/utils/billing";

// Shape of planModules entries
type PlanModuleRecord = {
  moduleId: number;
  included: boolean;
};

// Narrow shape for Prisma errors we care about
type PrismaError = {
  code?: string;
};

// Helper to detect Prisma errors by code (e.g. P2002)
function isPrismaErrorWithCode(error: unknown, code: string): error is PrismaError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

export async function GET() {
  const tenants = await prisma.tenant.findMany({
    include: {
      subscription: { include: { plan: true } },
      modules: { include: { module: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: tenants });
}

export async function POST(request: Request) {
  try {
    const payload = createTenantSchema.parse(await request.json());

    const plan = await prisma.plan.findUnique({
      where: { id: payload.planId },
      include: { planModules: true },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Explicitly type planModules so pm is not 'any'
    const planModules = plan.planModules as PlanModuleRecord[];

    const moduleIds = payload.moduleIds.length
      ? payload.moduleIds
      : planModules
          .filter((pm) => pm.included)
          .map((pm) => pm.moduleId);

    const now = new Date();
    const billingCycle = payload.billingCycle ?? plan.billingCycle;

    const subscriptionDates = resolveSubscriptionDates({
      start: now,
      cycle: billingCycle,
      trialDays: payload.trialDays,
    });

    const tenant = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
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

        return tx.tenant.findUniqueOrThrow({
          where: { id: createdTenant.id },
          include: {
            subscription: { include: { plan: true } },
            modules: { include: { module: true } },
          },
        });
      }
    );

    return NextResponse.json({ data: tenant }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    // Unique constraint violation (e.g. slug) – P2002
    if (isPrismaErrorWithCode(error, "P2002")) {
      return NextResponse.json(
        { error: "Tenant slug already exists" },
        { status: 409 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unable to create tenant" },
      { status: 500 }
    );
  }
}
