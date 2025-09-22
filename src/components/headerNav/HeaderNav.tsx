'use client';

import clsx from 'clsx';
import Image from 'next/image';
import DrawerMenu from '../drawer/DrawerMenu';
import BurgerButton from '../ui/BurgerButton';
import st from './styles.module.css';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const rawNavLinks = [
  { href: '/', labelKey: 'nav.map' },
  // { href: "/merch", labelKey: "nav.merch" },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/currency', labelKey: 'nav.currency' },
  { href: '/embassy', labelKey: 'nav.embassy' },
  { href: '/culture', labelKey: 'nav.culture' },
  { href: '/#contacts', labelKey: 'nav.contacts' },
];

// async function getMe() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/auth/me`, {
//     cache: 'no-store',
//   });
//   return (await res.json()) as { user: { id: string; role: 'ADMIN' | 'USER' } | null };
// }

// async function LogoutButton() {
//   const { user } = await getMe();
//   if (!user) return null;
//   return (
//     <button
//       className="rounded border px-3 py-1"
//       onClick={async () => {
//         await fetch('/api/auth/logout', { method: 'POST' });
//         location.href = '/auth';
//       }}
//     >
//       Выйти
//     </button>
//   );
// }

function buildLocalizedHref(href: string, locale: string) {
  if (href.startsWith('/#')) {
    return `/${locale}${href}`;
  }
  if (href === '/') {
    return `/${locale}`;
  }
  return `/${locale}${href}`;
}
export default function HeaderNav({
  hasBackground = false,
  menuOpen,
  setMenuOpen,
}: {
  hasBackground?: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const t = useTranslations();

  const segments = pathname?.split('/').filter(Boolean) || [];
  const currentLocale = segments[0] === 'ru' || segments[0] === 'md' ? segments[0] : 'ru';

  const pathWithoutLocale = pathname?.replace(/^\/(ru|md)/, '') || '/';

  return (
    <>
      {pathWithoutLocale === '/' && (
        <div className={st.heroBackground}>
          <Image
            src="/images/main/hero-bg.jpg"
            alt="Фон с вышивкой"
            fill
            sizes="(max-width: 1440px) 0px, 100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className={st.phoneContainer}>
            <img src="/images/main/phone-mobile.png" alt="Phone" />
          </div>
        </div>
      )}

      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-30 overflow-x-clip rounded-b-[10px] transition-colors duration-300',
          hasBackground
            ? "bg-[linear-gradient(360deg,rgba(0,0,0,0)_0%,#000_100%),url('/images/main/hero-bg.jpg')] bg-cover bg-center shadow-md"
            : 'bg-[linear-gradient(360deg,rgba(0,0,0,0)_0%,#000_100%)]',
        )}
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="relative flex h-[95px] items-center justify-between px-[18px] sm:px-[40px] lg:h-[130px]">
            <Link
              href={buildLocalizedHref('/', currentLocale)}
              replace
              aria-label={t('logo.main')}
              className="flex cursor-pointer items-center gap-[12px]"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/icons/logo/logo-moldova.svg"
                alt="Логотип Молдовы"
                width={36}
                height={36}
                className="h-[48px] w-[48px] sm:h-[70px] sm:w-[70px]"
              />
              <div className="text-sm leading-tight text-white sm:text-base">
                <span className="text-[6px] leading-[10px] tracking-widest sm:text-[10px] sm:leading-[14px] lg:text-[12px]">
                  {t('logo.prefix')}
                </span>
                <div className="text-[6px] leading-[10px] tracking-widest sm:text-[10px] sm:leading-[14px] lg:text-[12px]">
                  {t('logo.line2')}
                </div>
                <div className="mt-[6px] text-[12px] font-bold tracking-widest uppercase lg:text-[16px]">
                  {t('logo.main')}
                </div>
              </div>
            </Link>

            {/* <div className="block [@media(min-width:1200px)]:hidden">
              <LogoutButton />
            </div> */}

            <div className="block [@media(min-width:1200px)]:hidden">
              <BurgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
            </div>
            <nav className="hidden gap-6 px-8 text-white [@media(min-width:1200px)]:flex">
              {rawNavLinks.map(({ href, labelKey }) => {
                const localizedHref = buildLocalizedHref(href, currentLocale);
                const isActive =
                  href === '/#contacts'
                    ? pathWithoutLocale.startsWith('/#') // якорь на корне
                    : pathWithoutLocale === href || (href !== '/' && pathWithoutLocale.startsWith(href));

                return (
                  <Link
                    key={href + labelKey}
                    href={localizedHref}
                    className={clsx(
                      'opacity-70 transition-opacity duration-300 hover:opacity-100',
                      isActive && 'font-semibold opacity-100',
                    )}
                  >
                    {t(labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute right-[20px] bottom-[10px] sm:right-[30px]">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <DrawerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
