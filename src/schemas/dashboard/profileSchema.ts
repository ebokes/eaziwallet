import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  mobile: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^\+?[0-9\s]+$/, { message: "Invalid mobile number format" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
