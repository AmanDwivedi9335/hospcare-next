import { BillingCycle } from "@prisma/client";
import { z } from "zod";

const addressSchema = z
  .object({
    line1: z.string().min(2).max(120),
    city: z.string().min(2).max(80),
    country: z.string().min(2).max(60),
    postalCode: z.string().min(2).max(24),
  })
  .partial();

export const createTenantSchema = z.object({
  name: z.string().min(3).max(160),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and can only include letters, numbers and dashes"),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(6).max(30).optional(),
  planId: z.number().int().positive(),
  moduleIds: z.array(z.number().int().positive()).default([]),
  billingCycle: z.nativeEnum(BillingCycle).optional(),
  trialDays: z.number().int().min(0).max(60).default(14),
  address: addressSchema.optional(),
});

export const updateTenantSchema = z
  .object({
    name: z.string().min(3).max(160).optional(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and can only include letters, numbers and dashes")
      .optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().min(6).max(30).optional(),
    address: addressSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const tenantSignupSchema = createTenantSchema.extend({
  adminEmail: z.string().email(),
  adminPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const tenantLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type UpdateTenantInput = z.infer<typeof updateTenantSchema>;
export type TenantSignupInput = z.infer<typeof tenantSignupSchema>;
export type TenantLoginInput = z.infer<typeof tenantLoginSchema>;
