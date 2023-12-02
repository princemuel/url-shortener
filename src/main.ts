// import 'https://kit.fontawesome.com/bfdd3a54d7.js';

import { ZodError } from 'zod';
import './globals.css';
import {
  form,
  formError,
  input,
  list,
  skeleton,
  submitter,
  template,
  timeElement,
} from './scripts/elements';
import { hash, useFetchStatus, useState } from './scripts/helpers';
import './scripts/navigation';
import { queryElement } from './scripts/query-element';
import { TimeoutError, request, timeout } from './scripts/request';
import { ResponseSchema, UrlSchema } from './scripts/schema';
import { storage } from './scripts/storage';

timeElement.setAttribute('datetime', new Date().toISOString());
timeElement.innerText = new Date().getFullYear().toString();

const links = storage.isAvailable('localStorage')
  ? storage.getItem<Link[]>('links', [])
  : [];

const [_, setFetchStatus] = useFetchStatus('idle');
const [errorMessage, setErrorMessage] = useState('');
const [hashed, setHashed] = useState('');
const [shortened_url, setShortened_Url] = useState('');
const [original_url, setOriginal_Url] = useState('');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  this.reportValidity();
  new FormData(form, submitter);
});

form.addEventListener('formdata', async (e) => {
  console.log('formdata fired');
  const formData = e.formData;

  try {
    const original_url = UrlSchema.parse(formData.get('original_url'));
    // do not make the request if link's already shortened before
    if (links.some((link) => link.original_url === original_url)) {
      form.reset();
      return;
    }

    setOriginal_Url(original_url);
    setFetchStatus('pending');

    const controller = new AbortController();

    const response = await timeout(
      request(import.meta.env.VITE_RAPID_API_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
        },

        body: new URLSearchParams({
          url: original_url,
          // alias: 'google.com'
        }),
      }),
      { ms: 10000, controller: controller }
    );

    console.log('response', response);

    const json = ResponseSchema.parse(response);

    setShortened_Url(json.short_url);
    setHashed(await hash(original_url));

    storage.setItem<Array<Link>>('links', [
      ...links,
      {
        short_url: json.short_url,
        original_url,
        hash: hashed(),
      },
    ]);

    setFetchStatus('success');

    form.reset();
  } catch (error: any) {
    console.log(error);
    if (error instanceof TimeoutError) {
      console.error(`TimeoutError: ${error.message}`);
      setErrorMessage(error.message);
      setFetchStatus('delayed');
    } else if (error instanceof ZodError) {
      console.error(`ValidationError: ${error.flatten().formErrors[0]}`);
      setErrorMessage(`ValidationError: ${error.flatten().formErrors[0]}`);
      setFetchStatus('invalid');
    } else if (error.name === 'AbortError') {
      console.error(`AbortError: ${error.message}`);
      setErrorMessage(error.message);
      setFetchStatus('canceled');
    } else {
      console.error(error.message);
      setErrorMessage(error.message);
      setFetchStatus('failed');
    }
  }
  // finally {
  //   // setFetchStatus(fetchStatus());
  //   // form.dispatchEvent(FetchStatusEvent);
  // }
});

console.log('errorMessage', errorMessage());

document.addEventListener('fetchstatus', (e) => {
  // @ts-expect-error
  const status = e.detail.status;

  switch (status) {
    case 'pending': {
      skeleton.setAttribute('data-visible', 'true');
      break;
    }

    case 'success': {
      skeleton.setAttribute('data-visible', 'false');

      const linkElement = document.importNode(template.content, true);

      const updated = queryElement(
        '[data-id^="link-"]',
        'single',
        linkElement
      ).outerHTML.replace(/{{\s*hash\s*}}/g, hashed);

      queryElement('[data-id^="link-"]', 'single', linkElement).outerHTML =
        updated;

      queryElement(
        `[data-id^="link-original-"]`,
        'single',
        linkElement
      ).textContent = original_url();
      queryElement(
        `[data-id^="link-shortened-"]`,
        'single',
        linkElement
      ).textContent = shortened_url();

      const button = queryElement<HTMLButtonElement>(
        `[data-id^="copy-to-clipboard-"]`,
        'single',
        linkElement
      );
      button.addEventListener('click', async (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const shortened_link = shortened_url();

        let timer: number | undefined;

        try {
          if (timer) clearTimeout(timer);

          // !ALERT: ATM, this code in the while block just sets the aria-selected attribute on one of the elements to allow the dom get hold of it else it throws an error
          // //////////////////////////
          let retryCount = 1; // Set the maximum number of retries
          while (retryCount > 0) {
            try {
              queryElement('[aria-selected="true"]', 'list', list).forEach(
                (button) => {
                  button.setAttribute('aria-selected', 'false');
                  button.textContent = 'Copy';
                }
              );

              target.setAttribute('aria-selected', 'true');
              break;
            } catch (error) {
              target.setAttribute('aria-selected', 'true');
              retryCount -= 1;
            }
          }
          // //////////////////////////

          await navigator.clipboard.writeText(shortened_link);

          target.textContent = 'Copied!';
        } catch (error) {
          console.error(error);
        } finally {
          timer = setTimeout(() => {
            target.setAttribute('aria-selected', 'false');
            target.textContent = 'Copy';
          }, 4000);
        }
      });

      list.appendChild(linkElement);
      break;
    }
    case 'canceled':
    case 'delayed':
    case 'invalid':
    case 'failed': {
      skeleton.setAttribute('data-visible', 'false');
      input.setCustomValidity(errorMessage());
      formError.textContent = errorMessage();
      break;
    }

    case 'idle':
      skeleton.setAttribute('data-visible', 'false');
      break;
    default:
      throw new Error(`Unhandled action type '${status}'`);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const fragments = links.map((link) => {
    const linkElement = document.importNode(template.content, true);

    const updated = queryElement(
      '[data-id^="link-"]',
      'single',
      linkElement
    ).outerHTML.replace(/{{\s*hash\s*}}/g, link.hash);

    queryElement('[data-id^="link-"]', 'single', linkElement).outerHTML =
      updated;

    queryElement(
      `[data-id^="link-original-"]`,
      'single',
      linkElement
    ).textContent = link.original_url;
    queryElement(
      `[data-id^="link-shortened-"]`,
      'single',
      linkElement
    ).textContent = link.short_url;

    const button = queryElement<HTMLButtonElement>(
      `[data-id^="copy-to-clipboard-"]`,
      'single',
      linkElement
    );

    button.addEventListener('click', async (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const shortened_link = link.short_url;

      let timer: number | undefined;

      try {
        if (timer) clearTimeout(timer);

        // !TODO: ATM, this code in the while block just sets the aria-selected attribute on one of the elements to allow the dom get hold of it else it throws an error
        // //////////////////////////
        let retryCount = 1; // Set the maximum number of retries
        while (retryCount > 0) {
          try {
            queryElement('[aria-selected="true"]', 'list', list).forEach(
              (button) => {
                button.setAttribute('aria-selected', 'false');
                button.textContent = 'Copy';
              }
            );

            target.setAttribute('aria-selected', 'true');
            break;
          } catch (error) {
            target.setAttribute('aria-selected', 'true');
            retryCount -= 1;
          }
        }
        // //////////////////////////

        await navigator.clipboard.writeText(shortened_link);

        target.textContent = 'Copied!';
      } catch (error) {
        console.error(error);
      } finally {
        timer = setTimeout(() => {
          target.setAttribute('aria-selected', 'false');
          target.textContent = 'Copy';
        }, 4000);
      }
    });

    return linkElement;
  });

  list.append(...fragments);
});
