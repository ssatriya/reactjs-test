import { z } from "zod";

export const InputInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  itemData: z.array(
    z.object({
      itemDescription: z.string(),
      itemQuantity: z.string(),
      itemRate: z.string(),
      itemAmount: z.string(),
    })
  ),
});
export type InputInvoiceType = z.infer<typeof InputInvoiceSchema>;
