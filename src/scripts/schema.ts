import { z } from 'zod';

export const UrlSchema = z.string().url('invalid url').trim();

export const ResponseSchema = z.object({
  short_url: UrlSchema,
});
