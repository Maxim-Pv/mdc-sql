export interface ContactContent {
  title: string;
  address: string;
  phone: string;
  fax?: string;
  email: string;
}

export const CONTACTS: ContactContent[] = [
  {
    title: "Посольство",
    address: "107031, г. Москва, ул. Кузнецкий Мост, 18",
    phone: "+7 (495) 624-53-53",
    fax: "+7 (495) 625-53-82",
    email: "moscova@mfa.gov.md",
  },
  {
    title: "Консульский отдел",
    address: "107031, г. Москва, ул. Рождественка, 7",
    phone: "+7 (495) 790-75-46",
    email: "onsul.moscova@mfa.gov.md",
  },
];
