import { z } from "zod";

export const createModuleSchema = z.object({
  name: z.string().min(3).max(120),
  code: z
    .string()
    .regex(/^[A-Z0-9_\-]+$/i, "Only letters, numbers, dashes and underscores are allowed")
    .transform((value) => value.toUpperCase()),
  description: z.string().max(600).optional(),
  category: z.string().max(120).optional(),
  baseMonthlyPrice: z.number().nonnegative().max(100000).default(0),
  isCore: z.boolean().default(false),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
