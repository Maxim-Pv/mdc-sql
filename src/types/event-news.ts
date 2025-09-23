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

export type Form = {
  title: string;
  body: string;
  date?: string;
  coverUrl?: string;
  objectPosition?: string;
  tags?: string[];
  published?: boolean;
  sortDate?: string;
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

export type ContentAddModalData = {
  kind: ContentKind;
  initial?: {
    title?: string;
    body?: string;
    date?: string;
    objectPosition?: string;
  };
};

export type EventNewsUpdate =
  | {
      mode: 'create';
      kind: ContentKind;
      initial?: Partial<Pick<ContentItem, 'title' | 'date' | 'body' | 'objectPosition'>>;
    }
  | {
      mode: 'edit';
      item: ContentItem;
    };

export type EventNewsUpdateProps = {
  data: EventNewsUpdate;
  onSaved?: () => void;
  cacheKey?: string;
};
