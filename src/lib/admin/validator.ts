import { z } from "zod";

const relativePath = z.string().min(1).refine(v => v.startsWith('/') && !v.startsWith('//'),
  { message: 'Must start with "/"' });
const coverUrlSchema = z.union([z.string().url(), relativePath]);

export const newsCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().optional().default(""),     // читаемая строка
  body: z.string().optional().default(""),
  coverUrl: coverUrlSchema.optional(),
  objectPosition: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
  // для программной установки при импорте/если придёт ISO:
  publishedAt: z.string().datetime().optional(),
});
export const newsUpdateSchema = newsCreateSchema.partial().extend({
  coverUrl: z.union([coverUrlSchema, z.null()]).optional(),
});

export const eventCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().optional().default(""),
  body: z.string().optional().default(""),
  coverUrl: coverUrlSchema.optional(),
  objectPosition: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(true),
  // это «машинная» дата для сортировок/фильтров
  publishedAt: z.string().datetime().optional(),
});
export const eventUpdateSchema = eventCreateSchema.partial().extend({
  coverUrl: z.union([coverUrlSchema, z.null()]).optional(),
});
