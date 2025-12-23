import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10,15}$/, { message: "Please enter a valid phone number" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
