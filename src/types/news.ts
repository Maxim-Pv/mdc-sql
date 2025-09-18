export type ContentItem = {
  id: string;
  kind: "news" | "events";
  title: string;
  date: string;
  dateISO?: string; // дата в формате YYYY-MM-DD
  startISO?: string; // дата начала в формате
  endISO?: string; // дата окончания в формате
  image?: string;
  text?: string;
  objectPosition?: string;
  published?: boolean;
  mdxSlug?: string;
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
  | { id: string; kind?: "news" | "events"; fallback?: { title?: string } }
  | { id?: string; title: string; text?: string; content?: React.ReactNode };
