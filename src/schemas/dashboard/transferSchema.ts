import { z } from "zod";

export const transferSchema = z.object({
  amount: z
    .number()
    .positive({ message: "Amount must be greater than 0" })
    .min(0.01, { message: "Minimum transfer amount is $0.01" })
    .max(10000, { message: "Maximum transfer amount is $10,000" }),
});

export type TransferSchema = z.infer<typeof transferSchema>;
