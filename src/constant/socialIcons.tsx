import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandVk,
} from "@tabler/icons-react";

export const socialIcons = [
  {
    type: "icon",
    component: <IconBrandVk stroke={2} className="w-5 h-5" />,
    href: "https://vk.com/moldovacard",
  },
  {
    type: "icon",
    component: <IconBrandInstagram stroke={2} className="w-5 h-5" />,
    href: "http://instagram.com/moldovacard",
  },
  {
    type: "icon",
    component: <IconBrandTelegram stroke={2} className="w-5 h-5" />,
    href: "https://t.me/moldovacard",
  },
  {
    type: "icon",
    component: <IconBrandFacebook stroke={2} className="w-5 h-5" />,
    href: " https://www.facebook.com/moldovacard",
  },
  {
    type: "img",
    src: "/icons/classmates.svg",
    alt: "classmates",
    href: "https://ok.ru/group/70000007749717",
  },
  {
    type: "img",
    src: "/icons/dzen.svg",
    alt: "dzen",
    href: "https://dzen.ru/id/6853d7532a9f4e7683258d63?share_to=link",
  },
];
