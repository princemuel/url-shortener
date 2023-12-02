type Link = {
  short_url: string;
  original_url: string;
  hash: string;
};

type FetchStatus =
  | 'idle'
  | 'pending'
  | 'delayed'
  | 'canceled'
  | 'invalid'
  | 'failed'
  | 'success';
