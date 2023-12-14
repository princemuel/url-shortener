import type { Config } from '@netlify/functions';
import { createHash } from 'node:crypto';
import { TextEncoder } from 'node:util';
import { z } from 'zod';

const UrlSchema = z.string().url('invalid url').trim();

const RAPID_API_KEY = Netlify.env.get('RAPID_API_KEY') as string;
const RAPID_API_HOST = Netlify.env.get('RAPID_API_HOST') as string;
const RAPID_API_URL = Netlify.env.get('RAPID_API_URL') as string;

export const config: Config = {
  method: 'POST',
  path: '/api/shorten',
};

const ResponseSchema = z.object({
  short_url: UrlSchema,
});

const RequestSchema = z.object({
  url: UrlSchema,
});

export default async (request: Request) => {
  const body = RequestSchema.parse(await request.json());
  const original_url = body.url;

  try {
    const response = await fetch(RAPID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST,
      },
      body: JSON.stringify({ url: original_url }),
    });

    const result = ResponseSchema.parse(await response.json());

    return Response.json({
      status: 'success',
      hash: (await hash(original_url)).slice(0, 12),
      short_url: result.short_url,
      original_url: original_url,
    });
  } catch (error) {
    return Response.json(
      {
        status: 'failed',
        error: error.message,
      },
      { status: 422 }
    );
  }
};

async function hash(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);

  const buffer = createHash('sha256').update(data).digest();
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
