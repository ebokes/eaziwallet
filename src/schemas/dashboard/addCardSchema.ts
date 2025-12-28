import { z } from "zod";

export const addCardSchema = z.object({
  name: z.string().min(1, { message: "Card holder name is required" }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" })
    .regex(/^\d+$/, { message: "Card number must contain only digits" }),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Invalid expiry date (MM/YY)",
    })
    .refine(
      (val) => {
        if (!val) return false;
        const [month, year] = val.split("/");
        const expiryDate = new Date(parseInt("20" + year), parseInt(month));
        const today = new Date();
        return expiryDate > today;
      },
      { message: "Card has expired" }
    ),
  cvv: z
    .string()
    .length(3, { message: "CVV must be 3 digits" })
    .regex(/^\d+$/, { message: "CVV must contain only digits" }),
});

export type AddCardSchema = z.infer<typeof addCardSchema>;
