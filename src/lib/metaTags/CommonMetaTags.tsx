import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Карта гражданина Молдовы",
  url: "https://yoursite.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MD",
    addressLocality: "Кишинев",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Молдова",
    },
    {
      "@type": "Country",
      name: "Россия",
    },
  ],
};
export default function CommonMetaTags() {
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const mailruIds = (process.env.NEXT_PUBLIC_MAILRU_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const mailruGoalIds = (process.env.NEXT_PUBLIC_MAILRU_GOAL_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* РАСШИРЕННЫЕ ROBOTS */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="yandex" content="index, follow, noyaca, noarchive, nosnippet" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* ПОЛНЫЕ ИКОНКИ */}
        <link rel="icon" type="image/x-icon" href="/icons/logo/logo-moldova.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon-256x256.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="shortcut icon" href="/icons/logo/logo-moldova.svg" />

        {/* ПОЛНАЯ ЯЗЫКОВАЯ НАСТРОЙКА */}
        <meta name="language" content="ru" />
        <meta httpEquiv="content-language" content="ru-RU, md-MD" />
        <meta name="content-language" content="ru" />

        {/* МАКСИМАЛЬНАЯ НАСТРОЙКА APPLE */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MDCard" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="email=yes" />
        <meta name="format-detection" content="address=yes" />

        {/* ДОПОЛНИТЕЛЬНАЯ SEO ИНФОРМАЦИЯ */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=yes, email=yes, address=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />

        {/* МНОГОЯЗЫЧНОСТЬ ТОЖЕ САМОЕ  URL */}
        <link rel="alternate" hrefLang="ru" href="https://mdcard.ru/" />
        <link rel="alternate" hrefLang="ru-RU" href="https://mdcard.ru/" />
        <link rel="alternate" hrefLang="md" href="https://mdcard.ru/md" />
        <link rel="alternate" hrefLang="md-MD" href="https://mdcard.ru/md" />

        <link rel="manifest" href="/manifest.json" />
      </>

      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      {/* Yandex.Metrika */}
      <Script id="ym-init" strategy="afterInteractive">
        {`
          (function(){
            var id='${ymId ?? ""}'; if(!id) return;
            setTimeout(function(){
              if (typeof ym !== 'function') {
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                  k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
                })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
              }
              window.mainMetrikaId=id;
              ym(id,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,ecommerce:"dataLayer"});
            },2000);
          })();
        `}
      </Script>

      {/* Top.Mail.Ru: init code.js один раз, без pageView (его отправим на каждом роутинге) */}
      <Script id="mailru-init" strategy="afterInteractive">
        {`
          (function(){
            var ids=${JSON.stringify(mailruIds)};
            if (!ids.length) return;
            window._tmr = window._tmr || [];
            window.__mailruIds = ids;
            (function(d,w,id){
              if (d.getElementById(id)) return;
              var ts=d.createElement('script'); ts.type='text/javascript'; ts.async=true; ts.id=id;
              ts.src='https://top-fwz1.mail.ru/js/code.js';
              var s=d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ts,s);
            })(document, window, 'topmailru-code');
          })();
        `}
      </Script>

      {/* dyn-goal-config для автоцелей (на тильде был для 3677886) */}
      {mailruGoalIds.map((id) => (
        <Script key={id} src={`https://top-fwz1.mail.ru/js/dyn-goal-config.js?ids=${id}`} strategy="afterInteractive" />
      ))}
    </>
  );
}
