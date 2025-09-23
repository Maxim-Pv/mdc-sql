import AnalyticsRouterEvents from '@/components/analytics/AnalyticsRouterEvents';
import ModalRoot from '@/components/modals/ModalRoot';
import { LocaleFadeWrapper } from '@/components/ui/LocaleFadeWrapper';
import { CartProvider } from '@/providers/CartContext';
import { ModalProvider } from '@/providers/ModalContext';
import { routing } from '@/i18n/routing';
import CommonMetaTags from '@/lib/metaTags/CommonMetaTags';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import '../styles/globals.css';
import SessionProvider from '@/providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
function NoscriptMetrikaPixel() {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  if (!ymId) return null;
  return (
    <noscript>
      <div>
        <img src={`https://mc.yandex.ru/watch/${ymId}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
      </div>
    </noscript>
  );
}

function NoscriptMailruPixels() {
  const ids = (process.env.NEXT_PUBLIC_MAILRU_IDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!ids.length) return null;
  return (
    <noscript>
      {ids.map((id) => (
        <img
          key={id}
          src={`https://top-fwz1.mail.ru/counter?id=${id};js=na`}
          style={{
            border: 0,
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
          }}
          alt="Top.Mail.Ru"
        />
      ))}
    </noscript>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="overflow-x-clip">
      <head>
        <CommonMetaTags />
      </head>
      <body className="overflow-x-hidden">
        <NoscriptMetrikaPixel />
        <NoscriptMailruPixels />

        {/* SPA pageview для Mail.ru */}
        <Suspense fallback={null}>
          <AnalyticsRouterEvents />
        </Suspense>

        <NextIntlClientProvider>
          <LocaleFadeWrapper>
            <SessionProvider session={session}>
              <ModalProvider>
                <CartProvider>
                  {children}
                  <ModalRoot />
                </CartProvider>
              </ModalProvider>
            </SessionProvider>
          </LocaleFadeWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
