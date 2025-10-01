import { z } from 'zod';

export const merchSizeEnum = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
const sizeValue = z.union([merchSizeEnum, z.string().min(1)]);

export const merchItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  images: z.array(z.string().min(1)).min(1),
  size: sizeValue,
  sizes: z.array(sizeValue),
  density: z.string().min(1),
  sizeDescription: z.array(z.string().min(1)),
});

export const merchListSchema = z.array(merchItemSchema);

export type MerchItem = z.infer<typeof merchItemSchema>;
export type MerchList = z.infer<typeof merchListSchema>;
