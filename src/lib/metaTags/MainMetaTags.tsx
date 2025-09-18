import React from "react";
import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  "@id": "https://mdcard.ru",
  name: "Карта гражданина Молдовы",
  alternateName: ["MDCard", "Картул читатянулуй молдовенеск", "Citizen Card Moldova", "Карта гражданина Республики Молдова"],
  description:
    "Официальная карта социальной поддержки для граждан Республики Молдова, проживающих за рубежом. Предоставляет льготы в банках ПМР, пенсионную поддержку, телемедицину и юридические консультации.",
  url: "https://mdcard.ru/",
  sameAs: [
    "https://vk.com/mdcard_ru",
    "https://ok.ru/mdcard",
    "https://www.instagram.com/mdcard_official",
    "https://www.facebook.com/moldovacard",
    "https://dzen.ru/id/6853d7532a9f4e7683258d63",
    "https://diaspora.gov.md/mdcard",
    "https://gov.md/mdcard",
  ],
  provider: {
    "@type": "GovernmentOrganization",
    "@id": "https://mdcard.ru",
    name: "Министерство диаспоры Республики Молдова",
    alternateName: "Ministerul pentru Diaspora al Republicii Moldova",
    legalName: "Министерство диаспоры Республики Молдова",
    url: "https://diaspora.gov.md/",
    logo: {
      "@type": "ImageObject",
      url: "/images/moldova-gov-logo-512x512.png",
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "str. Petru Ungureanu 32",
      addressLocality: "Кишинев",
      addressRegion: "Муниципий Кишинев",
      postalCode: "MD-2001",
      addressCountry: "MD",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+373-22-234-567",
        contactType: "customer service",
        availableLanguage: ["Romanian", "Russian", "English"],
        hoursAvailable: "Mo-Fr 09:00-18:00",
      },
      {
        "@type": "ContactPoint",
        email: "info@diaspora.gov.md",
        contactType: "customer service",
        availableLanguage: ["Romanian", "Russian", "English"],
      },
    ],
    foundingDate: "2017-06-29",
    memberOf: {
      "@type": "GovernmentOrganization",
      name: "Правительство Республики Молдова",
    },
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Российская Федерация",
      sameAs: "https://www.wikidata.org/wiki/Q159",
    },
    {
      "@type": "Place",
      name: "Приднестровская Молдавская Республика",
      alternateName: ["ПМР", "Приднестровье", "Transnistria"],
    },
    {
      "@type": "Country",
      name: "Республика Молдова",
      sameAs: "https://www.wikidata.org/wiki/Q217",
    },
  ],
  audience: {
    "@type": "PeopleAudience",
    audienceType: "Граждане Республики Молдова",
    geographicArea: [
      {
        "@type": "Country",
        name: "Российская Федерация",
      },
      {
        "@type": "Place",
        name: "Приднестровская Молдавская Республика",
      },
    ],
    requiredMinAge: 18,
    suggestedMaxAge: 100,
    eligibilityToWorkStatus: "Любой статус",
    healthCondition: "Без ограничений",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Каталог услуг карты гражданина Молдовы",
    description: "Полный перечень льгот и услуг, доступных держателям карты гражданина Молдовы",
    itemListElement: [
      {
        "@type": "Offer",
        "@id": "#banking-benefits",
        name: "Льготы в банках ПМР",
        description: "Эксклюзивные условия обслуживания в Сбербанк ПМР: льготный курс валют, приоритетное обслуживание, специальные тарифы",
        price: "0",
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        category: "Банковские услуги",
        provider: {
          "@type": "Organization",
          name: "Сбербанк ПМР",
          url: "https://www.sberbank-pmr.org/",
        },
        areaServed: "Приднестровская Молдавская Республика",
      },
      {
        "@type": "Offer",
        "@id": "#telemedicine",
        name: "Телемедицинские консультации",
        description: "Круглосуточные консультации врачей на русском и румынском языках с покрытием 98% медицинских вопросов",
        price: "0",
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        category: "Медицинские услуги",
        availabilityStarts: "2024-01-01",
        availabilityEnds: "2030-12-31",
        areaServed: ["Российская Федерация", "Приднестровская Молдавская Республика", "Республика Молдова"],
      },
      {
        "@type": "Offer",
        "@id": "#legal-help",
        name: "Юридическая помощь",
        description: "Бесплатные консультации по миграционному и социальному праву, помощь в оформлении документов",
        price: "0",
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        category: "Юридические услуги",
        areaServed: ["Российская Федерация", "Республика Молдова"],
      },
      {
        "@type": "Offer",
        "@id": "#pension-support",
        name: "Пенсионная поддержка",
        description: "Помощь в оформлении российских пенсий в ПМР, консультации по молдавским социальным выплатам",
        price: "0",
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        category: "Социальные услуги",
        areaServed: ["Российская Федерация", "Приднестровская Молдавская Республика", "Республика Молдова"],
      },
    ],
  },
  termsOfService: "/terms",
  privacyPolicy: "/privacy",
  serviceType: "Государственная социальная услуга",
  serviceOutput: {
    "@type": "Thing",
    name: "Цифровая карта гражданина Молдовы",
    description: "Персональная электронная карта с уникальным номером и доступом к льготам и услугам",
  },
  hoursAvailable: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2547",
    bestRating: "5",
    worstRating: "1",
  },
  potentialAction: [
    {
      "@type": "RegisterAction",
      name: "Регистрация карты",
      target: "/register",
      result: {
        "@type": "Thing",
        name: "Карта гражданина Молдовы",
      },
    },
    {
      "@type": "SearchAction",
      name: "Поиск услуг",
      target: "/search?q={search_term}",
      "query-input": "required name=search_term",
    },
  ],
};

export default function MainMetaTags() {
  return (
    <>
      <>
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <title>Карта гражданина Молдовы в России - ваша надежная связь с Родиной</title>
        <meta
          name="description"
          content="Карта гражданина Молдовы: льготы Сбербанк ПМР (33,100 поисков), пенсии РФ в ПМР, социальные пособия в Молдове, телемедицина 24/7, юрпомощь"
        />

        <meta
          name="keywords"
          content="карта гражданина молдовы, сбербанк пмр, пенсии рф в пмр, социальные пособия в молдове, сбербанк тирасполь, льготы молдаванам в россии, телемедицина молдова, социальная поддержка граждан молдовы, юридическая консультация кишинев, российские пенсии в приднестровье, сбербанк пмр пенсионерам, курс валют сбербанк пмр, 900 лей пенсионерам в молдове, оформление пенсий рф, бесплатная юридическая помощь, телемедицинские услуги, юридическая консультация тирасполь, сбербанк онлайн пмр, банковские услуги пмр, льготный курс валют, приоритетное обслуживание, перевод пенсии из россии, консультации врачей, медицинская поддержка, правовая помощь, миграционное право, сбербанк бендеры, сбербанк рыбница, сбербанк дубоссары, социальные программы молдаван, материальная помощь, государственная поддержка, диаспора молдовы, граждане молдовы в россии, пенсионеры молдовы, держатели карт, министерство диаспоры молдова, кому положена социальная помощь в молдове, социальная помощь пенсионерам в молдове, социальные выплаты в молдове, пенсия россии в пмр"
        />

        {/* РАСШИРЕННАЯ АВТОРСКАЯ ИНФОРМАЦИЯ */}
        <meta name="author" content="Карта гражданина Молдовы | Официальный портал Республики Молдова | Министерство диаспоры Республики Молдова" />
        <meta
          name="publisher"
          content="Министерство диаспоры Республики Молдова | Правительство Республики Молдова | Официальный государственный портал"
        />
        <meta name="copyright" content="© 2024-2025 Республика Молдова. Все права защищены. Официальный портал карты гражданина Молдовы" />
        <meta name="owner" content="Правительство Республики Молдова" />
        <meta name="reply-to" content="presscard@mdcard.ru" />
        <meta name="generator" content="MDCard Official Platform v2.5.1" />
        <meta name="designer" content="Министерство диаспоры Республики Молдова" />
        <meta name="subject" content="Карта гражданина Молдовы: льготы, социальная поддержка, банковские услуги, телемедицина, юридическая помощь" />
        <meta
          name="abstract"
          content="Официальная карта гражданина Молдовы предоставляет льготы в Сбербанк ПМР, пенсионную поддержку, телемедицину и юридические консультации"
        />
        <meta
          name="topic"
          content="Государственные услуги, социальная поддержка, банковские льготы, медицинские услуги, юридическая помощь, пенсионное обеспечение"
        />
        <meta
          name="summary"
          content="Карта гражданина Молдовы - официальный инструмент социальной поддержки граждан Республики Молдова, проживающих за рубежом"
        />
        <meta name="classification" content="Государственные услуги" />
        <meta name="category" content="Социальная поддержка" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />

        {/* МАКСИМАЛЬНЫЙ OPEN GRAPH */}
        <meta property="og:title" content="Карта гражданина Молдовы: льготы Сбербанк ПМР, пенсии РФ в ПМР, телемедицина 24/7, юридическая помощь" />
        <meta
          property="og:description"
          content="🇲🇩 Получите официальную карту гражданина Молдовы и получайте льготы в Сбербанк ПМР, поддержку по российским пенсиям, бесплатную телемедицину и юридические консультации"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdcard.ru/" />
        <meta property="og:site_name" content="Карта гражданина Молдовы | Официальный портал Республики Молдова" />
        {/* <meta
          property="og:image"
          content="https://mdcard.ru/images/og-image-main-1200x630-v2.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://mdcard.ru/images/og-image-main-1200x630-v2.jpg"
        /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Карта гражданина Молдовы - льготы Сбербанк ПМР, российские пенсии, телемедицина, юридическая помощь" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:locale:alternate" content="ro_MD" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:updated_time" content="2025-01-01T00:00:00Z" />
        {/* <meta property="og:see_also" content="https://mdcard.ru/sberbank-pmr" /> */}
        {/* <meta
          property="og:see_also"
          content="https://mdcard.ru/pension-support"
        /> */}
        {/* <meta property="og:see_also" content="https://mdcard.ru/telemedicine" />
        <meta property="og:see_also" content="https://mdcard.ru/legal-help" /> */}

        {/* РАСШИРЕННАЯ ИНФОРМАЦИЯ О СТАТЬЕ */}
        <meta property="article:author" content="Министерство диаспоры Республики Молдова" />
        <meta property="article:publisher" content="Правительство Республики Молдова" />
        <meta property="article:section" content="Государственные услуги" />
        <meta property="article:tag" content="карта гражданина" />
        <meta property="article:tag" content="сбербанк пмр" />
        <meta property="article:tag" content="пенсии рф в пмр" />
        <meta property="article:tag" content="телемедицина" />
        <meta property="article:tag" content="юридическая помощь" />
        <meta property="article:tag" content="социальные пособия" />
        <meta property="article:tag" content="льготы молдаванам" />
        <meta property="article:published_time" content="2023-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-01T00:00:00Z" />

        {/* ДИЗАЙН И ТЕМА (МАКСИМАЛЬНАЯ НАСТРОЙКА) */}
        <meta name="theme-color" content="#0066CC" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#0066CC" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1E40AF" />
        <meta name="msapplication-TileColor" content="#0066CC" />
        <meta name="msapplication-navbutton-color" content="#0066CC" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-window" content="width=1024;height=768" />
        <meta name="msapplication-tooltip" content="Карта гражданина Молдовы - льготы и социальная поддержка" />
        <meta name="msapplication-task" content="name=Получить карту;action-uri=/register;icon-uri=/favicon.ico" />
        <meta name="msapplication-task" content="name=Льготы Сбербанк;action-uri=/sberbank-pmr;icon-uri=/favicon.ico" />
        <meta name="msapplication-task" content="name=Пенсионная помощь;action-uri=/pension-support;icon-uri=/favicon.ico" />
        <meta name="msapplication-task" content="name=Телемедицина;action-uri=/telemedicine;icon-uri=/favicon.ico" />

        {/* МАКСИМАЛЬНЫЕ ТЕХНИЧЕСКИЕ ССЫЛКИ */}
        <link rel="canonical" href="https://mdcard.ru/" />
        <link rel="alternate" href="/amp/" media="only screen and (max-width: 640px)" />
        <link rel="alternate" type="application/rss+xml" title="Новости карты гражданина Молдовы" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Обновления карты гражданина Молдовы" href="/atom.xml" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* МНОГОЯЗЫЧНОСТЬ */}
        <link rel="alternate" hrefLang="ru" href="https://mdcard.ru/ru" />
        <link rel="alternate" hrefLang="ru-RU" href="https://mdcard.ru/ru" />
        <link rel="alternate" hrefLang="md" href="https://mdcard.ru/md/" />
        <link rel="alternate" hrefLang="md-MD" href="https://mdcard.ru/md/" />
        {/* <link rel="alternate" hrefLang="en" href="https://mdcard.ru/en/" />
        <link rel="alternate" hrefLang="en-US" href="https://mdcard.ru/en/" /> */}
        <link rel="alternate" hrefLang="x-default" href="https://mdcard.ru/" />

        {/* УСКОРЕНИЕ ЗАГРУЗКИ */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.mdcard.ru" />
        <link rel="dns-prefetch" href="//cdn.mdcard.ru" />
        <link rel="dns-prefetch" href="//static.mdcard.ru" />
        <link rel="dns-prefetch" href="//img.mdcard.ru" />
        <link rel="dns-prefetch" href="//mc.yandex.ru" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//vk.com" />
        <link rel="dns-prefetch" href="//ok.ru" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//facebook.com" />
        <link rel="dns-prefetch" href="//dzen.ru" />
        <link rel="preconnect" href="https://api.mdcard.ru" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.mdcard.ru" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ДОПОЛНИТЕЛЬНАЯ SEO ИНФОРМАЦИЯ */}
        <meta
          name="news_keywords"
          content="карта гражданина молдовы, сбербанк пмр, пенсии рф в пмр, социальные пособия молдова, телемедицина, юридическая помощь, льготы молдаванам"
        />
        <meta name="standout" content="https://mdcard.ru/" />
        <meta name="syndication-source" content="https://mdcard.ru/" />
        <meta name="original-source" content="https://mdcard.ru/" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        <meta name="application-name" content="Карта гражданина Молдовы" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </>

      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      {/* ЯНДЕКС.МЕТРИКА (расширенная) */}
      {/* <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
          (m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(12345678, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            trackHash:true
          });

          ym(12345678, 'params', {
            'page_type': 'main_page',
            'user_segment': 'moldovan_diaspora',
            'content_category': 'government_services',
            'card_program': 'citizen_card_moldova'
          });

          ym(12345678, 'reachGoal', 'main_page_view');
        `}
      </Script>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/12345678"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript> */}

      {/* GOOGLE ANALYTICS 4 (расширенная) */}
      {/* <Script
        id="google-analytics"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            'page_title': 'Главная страница | Карта гражданина Молдовы',
            'page_location': 'https://mdcard.ru/',
            'content_group1': 'Главная страница',
            'content_group2': 'Государственные услуги',
            'content_group3': 'Карта гражданина',
            'content_group4': 'Молдова диаспора',
            'custom_map': {
              'custom_parameter_1': 'user_type',
              'custom_parameter_2': 'card_status',
              'custom_parameter_3': 'region',
              'custom_parameter_4': 'service_interest'
            }
          });

          gtag('event', 'page_view', {
            'page_title': 'Главная - Карта гражданина Молдовы',
            'page_location': window.location.href,
            'user_type': 'new_visitor',
            'content_category': 'government_services'
          });

          gtag('event', 'main_page_visit', {
            'event_category': 'Page Interaction',
            'event_label': 'Main Page',
            'user_segment': 'moldovan_diaspora'
          });
        `}
      </Script> */}

      {/* VK Pixel */}
      {/* <Script id="vk-pixel" strategy="afterInteractive">
        {`
          (function(){
            var t=document.createElement("script");
            t.type="text/javascript",t.async=!0,
            t.src='https://vk.com/js/api/openapi.js?169',
            t.onload=function(){
              VK.Retargeting.Init("VK-RTRG-XXXXXX-XXXXX");
              VK.Retargeting.Hit();
            };
            document.head.appendChild(t);
        })();
        `}
      </Script> */}

      {/* OK Pixel */}
      {/* <Script id="ok-pixel" strategy="afterInteractive">
        {`
          (function (d, w) {
            var n = d.getElementsByTagName("script")[0],
            s = d.createElement("script"),
            f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://ok.ru/dk?st.cmd=profileWidgetScript&st.rId=XXXXXXXXXXXXX";
            if (w.opera == "[object Opera]") {
              d.addEventListener("DOMContentLoaded", f, false);
            } else {
              f();
            }
          })(document, window);
        `}
      </Script> */}

      {/* Поведенческая аналитика */}
      {/* <Script id="behavior-tracking" strategy="afterInteractive">
        {`
          let startTime = Date.now();
          window.addEventListener('beforeunload', function() {
            let timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (timeSpent > 10) {
              ym(12345678, 'params', {'time_on_page': timeSpent});
              gtag('event', 'timing_complete', {
                'name': 'page_view',
                'value': timeSpent
              });
            }
          });
          let maxScroll = 0;
          window.addEventListener('scroll', function() {
              let scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > maxScroll) {
                  maxScroll = scrollPercent;
                  
                  if (scrollPercent >= 25 && !window.scroll25) {
                      ym(12345678, 'reachGoal', 'scroll_25');
                      gtag('event', 'scroll', {'percent_scrolled': 25});
                      window.scroll25 = true;
                  }
                  if (scrollPercent >= 50 && !window.scroll50) {
                      ym(12345678, 'reachGoal', 'scroll_50'); 
                      gtag('event', 'scroll', {'percent_scrolled': 50});
                      window.scroll50 = true;
                  }
                  if (scrollPercent >= 75 && !window.scroll75) {
                      ym(12345678, 'reachGoal', 'scroll_75');
                      gtag('event', 'scroll', {'percent_scrolled': 75});
                      window.scroll75 = true;
                  }
                  if (scrollPercent >= 90 && !window.scroll90) {
                      ym(12345678, 'reachGoal', 'scroll_90');
                      gtag('event', 'scroll', {'percent_scrolled': 90});
                      window.scroll90 = true;
                  }
              }
          });

          document.addEventListener('click', function(e) {
              if (e.target.matches('.cta-primary, .cta-button, [class*="cta"]')) {
                  let buttonText = e.target.textContent.trim().substring(0, 50);
                  ym(12345678, 'reachGoal', 'cta_click', {
                      'button_text': buttonText,
                      'button_location': getElementLocation(e.target)
                  });
                  gtag('event', 'click', {
                      'event_category': 'CTA Button',
                      'event_label': buttonText
                  });
              }
              
              if (e.target.matches('a[href^="/"], a[href*="mdcard.ru"]')) {
                  let linkText = e.target.textContent.trim().substring(0, 50);
                  let linkUrl = e.target.href;
                  ym(12345678, 'reachGoal', 'internal_link', {
                      'link_text': linkText,
                      'link_url': linkUrl
                  });
                  gtag('event', 'click', {
                      'event_category': 'Internal Link',
                      'event_label': linkText
                  });
              }
              
              if (e.target.matches('a[href^="tel:"], a[href^="mailto:"]')) {
                  let contactType = e.target.href.includes('tel:') ? 'phone' : 'email';
                  ym(12345678, 'reachGoal', 'contact_click', {'contact_type': contactType});
                  gtag('event', 'contact', {
                      'method': contactType
                  });
              }
              
              if (e.target.matches('a[href*="vk.com"], a[href*="ok.ru"], a[href*="instagram.com"]')) {
                  let platform = 'unknown';
                  if (e.target.href.includes('vk.com')) platform = 'vkontakte';
                  if (e.target.href.includes('ok.ru')) platform = 'odnoklassniki';
                  if (e.target.href.includes('instagram.com')) platform = 'instagram';
                  
                  ym(12345678, 'reachGoal', 'social_click', {'platform': platform});
                  gtag('event', 'share', {
                      'method': platform,
                      'content_type': 'website',
                      'item_id': 'main_page'
                  });
              }
          });

          function getElementLocation(element) {
              let rect = element.getBoundingClientRect();
              let viewportHeight = window.innerHeight;
              
              if (rect.top < viewportHeight / 3) return 'top';
              if (rect.top < viewportHeight * 2 / 3) return 'middle';
              return 'bottom';
          }

          window.addEventListener('load', function() {
              let loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
              ym(12345678, 'params', {'page_load_time': loadTime});
              gtag('event', 'timing_complete', {
                  'name': 'load',
                  'value': loadTime
              });
          });
        `}
      </Script> */}
    </>
  );
}
