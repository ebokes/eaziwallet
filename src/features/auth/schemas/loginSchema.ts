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

export const forgotPasswordSchema = z
  .object({
    method: z.enum(["email", "mobile"]),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    mobile: z
      .string()
      .regex(/^\d{10,15}$/, { message: "Please enter a valid phone number" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.method === "email") {
        return !!data.email;
      }
      if (data.method === "mobile") {
        return !!data.mobile;
      }
      return false;
    },
    {
      message: "This field is required",
      path: ["email"], 
    }
  )
  .superRefine((data, ctx) => {
    if (data.method === "email" && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is required",
        path: ["email"],
      });
    }
    if (data.method === "mobile" && !data.mobile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mobile number is required",
        path: ["mobile"],
      });
    }
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
