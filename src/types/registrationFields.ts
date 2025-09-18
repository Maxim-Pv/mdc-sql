export type FormValues = {
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  phone: string;
  office?: string;
  book_time?: string;
  agree: boolean;
};

export const FIELD_ORDER = [
  "firstName",
  "lastName",
  "region",
  "city",
  "phone",
  "status",
  "office",
  "book_time",
  "agree",
] as const;
