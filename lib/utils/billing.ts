import { BillingCycle, SubscriptionStatus } from "../../app/generated/prisma/enums";

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function resolveSubscriptionDates({
  start,
  cycle,
  trialDays = 0,
}: {
  start: Date;
  cycle: BillingCycle;
  trialDays?: number;
}) {
  const currentPeriodStart = new Date(start);
  let status: SubscriptionStatus = SubscriptionStatus.ACTIVE;
  let currentPeriodEnd: Date;
  let trialEndsAt: Date | undefined;

  if (trialDays > 0) {
    status = SubscriptionStatus.TRIALING;
    trialEndsAt = addDays(currentPeriodStart, trialDays);
    currentPeriodEnd = trialEndsAt;
  } else {
    const monthsToAdd = cycle === BillingCycle.MONTHLY ? 1 : 12;
    currentPeriodEnd = addMonths(currentPeriodStart, monthsToAdd);
  }

  return {
    status,
    currentPeriodStart,
    currentPeriodEnd,
    trialEndsAt,
  };
}
