import z from 'zod';

export const BodySchema = z.object({
  amount: z.number().positive(), // сумма в рублях
  description: z.string().min(1),
  orderId: z.string().uuid(),
  returnTo: z.string().optional(),
  customer: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(5),
  }),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        price: z.number().positive(), // за 1 шт
        qty: z.number().int().positive(),
        productId: z.string().optional(),
        // vat_code: z.number().int().min(1).max(6).optional(), // для 54-ФЗ (по умолчанию 1 = без НДС)
      }),
    )
    .min(1),
  delivery: z.object({
    method: z.enum(['cdek', 'post', 'pickup']),
    city: z.string().optional(),
    address: z.string().optional(),
    pickupPoint: z.string().optional(),
  }),
});
