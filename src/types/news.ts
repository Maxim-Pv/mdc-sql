export type ContentKind = 'news' | 'events';

export type ContentItem = {
  id: string;
  kind: ContentKind;
  title: string;
  date: string;
  image?: string;
  objectPosition?: string;
  published?: boolean;
  body?: any;
};

export type EventItem = {
  id: string;
  title: string;
  image?: string;
  date?: string;
  text?: string;
  objectPosition?: string;
};

export type EventModalData =
  | { id: string; kind?: ContentKind; fallback?: { title?: string } }
  | { id?: string; title: string; text?: string; content?: React.ReactNode };
