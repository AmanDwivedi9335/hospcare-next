import bcrypt from "bcrypt";
import { PrismaClient, BillingCycle, SubscriptionStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const modules = [
    {
      code: "ADMISSION",
      name: "Admissions & Beds",
      description: "Manage wards, beds, admissions and discharges across multi-branch facilities.",
      category: "Clinical",
      baseMonthlyPrice: 49,
      isCore: true,
    },
    {
      code: "OPD",
      name: "OPD & Appointments",
      description: "Self-service appointments, token generation and queue management.",
      category: "Clinical",
      baseMonthlyPrice: 39,
      isCore: true,
    },
    {
      code: "BILLING",
      name: "Billing & Finance",
      description: "Centralized invoices, cash collection and subscription aware reports.",
      category: "Finance",
      baseMonthlyPrice: 35,
      isCore: true,
    },
    {
      code: "LAB",
      name: "Laboratory",
      description: "Test catalogue, sample tracking and smart result templates.",
      category: "Diagnostics",
      baseMonthlyPrice: 19,
      isCore: false,
    },
    {
      code: "PHARMACY",
      name: "Pharmacy",
      description: "Inventory, dispensing workflows and supplier reconciliation.",
      category: "Operations",
      baseMonthlyPrice: 25,
      isCore: false,
    },
  ];

  await Promise.all(
    modules.map((module) =>
      prisma.module.upsert({
        where: { code: module.code },
        update: module,
        create: module,
      }),
    ),
  );

  const essentialPlan = await prisma.plan.upsert({
    where: { slug: "essential-monthly" },
    update: {
      price: 149,
    },
    create: {
      name: "Essential",
      slug: "essential-monthly",
      description: "Core modules for single facility hospitals",
      billingCycle: BillingCycle.MONTHLY,
      price: 149,
      planModules: {
        create: modules.map((module) => ({
          module: { connect: { code: module.code } },
          included: module.isCore,
        })),
      },
    },
  });

  await prisma.plan.upsert({
    where: { slug: "growth-yearly" },
    update: {
      price: 1499,
    },
    create: {
      name: "Growth",
      slug: "growth-yearly",
      description: "Yearly pricing with every operational module included",
      billingCycle: BillingCycle.YEARLY,
      price: 1499,
      planModules: {
        create: modules.map((module) => ({
          module: { connect: { code: module.code } },
          included: true,
        })),
      },
    },
  });

  const tenant = await prisma.tenant.upsert({
    where: { slug: "demo-hospital" },
    update: {},
    create: {
      name: "Demo General Hospital",
      slug: "demo-hospital",
      contactEmail: "contact@demo-hospital.test",
      contactPhone: "+1 222-333-4444",
      address: { line1: "42 Demo Street", city: "Remote", country: "Nowhere" },
      modules: {
        create: modules
          .filter((module) => module.isCore)
          .map((module) => ({
            module: { connect: { code: module.code } },
          })),
      },
    },
  });

  await prisma.subscription.upsert({
    where: { tenantId: tenant.id },
    update: {
      planId: essentialPlan.id,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(),
      status: SubscriptionStatus.ACTIVE,
    },
    create: {
      tenantId: tenant.id,
      planId: essentialPlan.id,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(),
      status: SubscriptionStatus.ACTIVE,
    },
  });

  const passwordHash = await bcrypt.hash("supersecret", 10);

  await prisma.user.upsert({
    where: { email: "superadmin@hospcare.test" },
    update: {},
    create: {
      email: "superadmin@hospcare.test",
      passwordHash,
      role: UserRole.SUPERADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@demo-hospital.test" },
    update: {},
    create: {
      email: "admin@demo-hospital.test",
      passwordHash,
      role: UserRole.HOSPITAL_ADMIN,
      tenantId: tenant.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
