import { z } from 'zod';

export const UrlSchema = z.string().url('invalid url').trim();

export const ServerResponseSchema = z.object({
  short_url: UrlSchema,
});

export const ResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    hash: z.string().min(8),
    short_url: UrlSchema,
    original_url: UrlSchema,
  }),
  z.object({ status: z.literal('failed'), error: z.string() }),
]);
