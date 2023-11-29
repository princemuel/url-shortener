import { z } from 'zod';

export const UrlSchema = z.string().url('invalid url');

export const ResultData = z.object({
  result_url: UrlSchema,
});
export const ResultError = z.instanceof(Error);

export const ResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: ResultData }),
  z.object({ status: z.literal('failed'), error: ResultError }),
]);
