// import 'https://kit.fontawesome.com/bfdd3a54d7.js';

import { ZodError } from 'zod';
import './globals.css';
import { form, submitter, timeElement } from './scripts/elements';
import { useState } from './scripts/helpers';
import './scripts/navigation';
import { TimeoutError, request, timeout } from './scripts/request';
import { ResponseSchema, UrlSchema } from './scripts/schema';

timeElement.setAttribute('datetime', new Date().toISOString());
timeElement.innerText = new Date().getFullYear().toString();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(form, submitter);
});

form.addEventListener('formdata', async (e) => {
  console.log('formdata fired');
  const formData = e.formData;
  console.log(formData);

  try {
    const result = UrlSchema.parse(formData.get('original_url'));

    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

type FetchStatus =
  | 'idle'
  | 'pending'
  | 'delayed'
  | 'canceled'
  | 'failed'
  | 'success';

const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');

async function shortenUrl(value: string) {
  try {
    setFetchStatus('pending');
    const controller = new AbortController();

    const response = await timeout(
      request(import.meta.env.VITE_RAPID_API_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
        },
        body: new URLSearchParams({
          url: value,
          // url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDidNotSucceed',
        }),
      }),
      { ms: 10000, controller: controller }
    );

    const json = ResponseSchema.parse(response);
    if (json.status === 'failed') throw json.error;

    return json.data;
  } catch (error: any) {
    console.log(error);
    if (error instanceof TimeoutError) {
      setFetchStatus('delayed');
      console.error(`TimeoutError: ${error.message}`);
    } else if (error instanceof ZodError) {
      setFetchStatus('canceled');
      console.error(`ValidationError: ${error.message}`);
    } else if (error.name === 'AbortError') {
      setFetchStatus('canceled');
      console.error(`AbortError: ${error.message}`);
    } else {
      setFetchStatus('failed');
      console.error(error.message);
      // console.error(`There was a problem with the operation: ${error}`);
    }
  }
}

// interface BaseEvent {}

// interface EventMap {
//   'status/set': BaseEvent & { type: number };
//   CHECKOUT: BaseEvent;
// }

// type DispatchAction<T extends keyof EventMap> = {
//   type: T;
//   payload: EventMap[T];
// };

// function dispatch<T extends keyof EventMap>(action: DispatchAction<T>) {}
