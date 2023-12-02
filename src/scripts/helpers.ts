export function useState<T>(initialState: T) {
  return [
    () => initialState,
    (value: T) => {
      initialState = value;
    },
  ] as const;
}

export function useFetchStatus(status: FetchStatus) {
  const fetchStatusEvent = new CustomEvent('fetchstatus', {
    detail: {},
    bubbles: true,
    cancelable: true,
  }) as CustomEvent<{ status: FetchStatus }>;

  const dispatchEvent = () => {
    document.dispatchEvent(fetchStatusEvent);
  };

  return [
    () => status,

    (value: FetchStatus) => {
      status = value;
      fetchStatusEvent.detail.status = status;
      dispatchEvent();

      console.log('fetchstatus:', fetchStatusEvent.detail.status);
    },
  ] as const;
}

export async function hash(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);

  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

// export function useFetchStatus(status: FetchStatus) {
//   let debounceTimer: number | null = null;
//   const fetchStatusEvent = new CustomEvent('fetchstatus', {
//     detail: {},
//     bubbles: true,
//     cancelable: true,
//   }) as CustomEvent<{ status: FetchStatus }>;

//   const dispatchEvent = () => {
//     document.dispatchEvent(fetchStatusEvent);
//   };

//   return [
//     () => status,
//     (value: FetchStatus) => {
//       status = value;

//       if (debounceTimer != null) {
//         clearTimeout(debounceTimer);
//       }

//       debounceTimer = setTimeout(() => {
//         fetchStatusEvent.detail.status = status;
//         dispatchEvent();
//         debounceTimer = null;
//       }, 200);
//     },
//   ] as const;
// }
