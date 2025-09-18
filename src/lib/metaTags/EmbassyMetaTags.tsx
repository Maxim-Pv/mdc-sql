import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Embassy",
  "@id": "#moldova-embassy-moscow",
  name: "Посольство Республики Молдова в Москве",
  alternateName: ["Embassy of Moldova in Moscow", "Ambasada Moldovei la Moscova"],
  description: "Официальное дипломатическое представительство Республики Молдова в РФ с услугами ВНЖ",
  url: "https://mdcard.ru/ru/embassy",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Кузнецкий мост, 18, стр. 7",
    addressLocality: "Москва",
    postalCode: "107031",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.7584,
    longitude: 37.625,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+7 (495) 624-53-53",
      contactType: "consular services",
      availableLanguage: ["Romanian", "Russian"],
      serviceType: "ВНЖ РФ для граждан Молдовы",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Консульские услуги Посольства Молдовы",
    itemListElement: [
      {
        "@type": "Offer",
        "@id": "#vnzh-rf-service",
        name: "ВНЖ РФ для граждан Молдовы",
        description: "Уникальная услуга получения ВНЖ РФ для молдаван через посольство",
        category: "Миграционные услуги",
      },
      {
        "@type": "Offer",
        "@id": "#reservio-booking",
        name: "Онлайн запись Reservio",
        description: "Современная система онлайн записи в посольство через Reservio",
        category: "Цифровые услуги",
      },
    ],
  },
  serviceProvider: {
    "@type": "Organization",
    name: "MDCard - Карта гражданина Молдовы",
    url: "https://mdcard.ru/",
    description: "Официальный портал карты гражданина Молдовы для интеграции в России",
    sameAs: [
      // "https://vk.com/mdcard",
      // "https://ok.ru/group/mdcard",
      // "https://t.me/mdcard_official",
    ],
  },
  parentOrganization: {
    "@type": "GovernmentOrganization",
    name: "Министерство иностранных дел Республики Молдова",
    // url: "https://mfa.md/",
  },
};

const FAQschema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Как получить ВНЖ РФ гражданам Молдовы через посольство в Москве?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ВНЖ РФ для граждан Молдовы можно получить по упрощенной процедуре. MDCard поможет с документами и запишет в посольство на Кузнецком мосту, 18.",
      },
    },
    {
      "@type": "Question",
      name: "Как записаться в Посольство Молдовы через Reservio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Запись в посольство осуществляется через систему Reservio на официальном сайте или через MDCard. Доступны слоты с 9:00 до 18:00.",
      },
    },
    {
      "@type": "Question",
      name: "Адрес Посольства Молдовы в Москве и как добраться?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Адрес: Кузнецкий мост, 18, стр. 7. Метро: Кузнецкий мост, Лубянка, Охотный ряд. Альтернативный адрес: Рождественка, 7.",
      },
    },
  ],
};

const MicroData = {
  "@context": "https://schema.org",
  "@type": "Embassy",
  name: "Посольство Молдовы в Москве",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Кузнецкий мост, 18, стр. 7",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    itemListElement: [
      {
        "@type": "Offer",
        name: "ВНЖ РФ для граждан Молдовы",
        category: "Уникальная миграционная услуга",
        // url: "https://mdcard.ru/embassy/vnzh-rf-moldavy/",
      },
    ],
  },
  // url: "https://mdcard.ru/posolstvo-moldovy/",
};

export default function EmbassyMetaTags() {
  return (
    <div>
      <>
        <title>Посольство Молдовы в Москве: официальный сайт, запись онлайн, ВНЖ РФ | MDCard</title>
        <meta
          name="description"
          content="🏛️ Посольство Молдовы Кузнецкий мост 18: запись через Reservio, ВНЖ РФ для граждан, загранпаспорт. MDCard - официальный помощник карты гражданина ✅ 12,785+"
        />
        <meta
          name="keywords"
          content="посольство молдовы, посольство молдовы в москве, молдова официальный посольство, сайт посольства молдовы, официальный сайт посольства молдовы, посольство республики молдова, кузнецкий мост 18 посольство молдовы, кузнецкий мост 18 7 посольство молдовы, запись в посольство молдовы, посольство молдовы в москве официальный сайт, посольство молдовы в россии, посольство республики молдова в российской федерации, внж рф для граждан молдовы, загранпаспорт посольство молдовы, посольство молдовы запись на прием, онлайн запись в посольство молдовы, reservio посольство молдовы, адрес посольства молдовы, посольство молдовы телефон, консульский отдел посольства молдовы, посольство молдовы график работы, посольство молдовы метро, записаться в посольство молдовы, посольство молдовы гражданство, рождественка 7 посольство молдовы, карта гражданина молдовы посольство, mdcard посольство помощь"
        />

        <meta name="author" content="MDCard - Карта гражданина Молдовы | Помощь в посольских услугах" />
        <meta name="publisher" content="MDCard.ru - Официальный портал карты гражданина Молдовы" />
        <meta name="subject" content="Посольство Молдовы через MDCard: ВНЖ РФ, документы, интеграция граждан" />
        <meta
          name="abstract"
          content="Посольство Молдовы в Москве через MDCard: официальная помощь с ВНЖ РФ, загранпаспортом, консульскими услугами для держателей карты гражданина"
        />
        <meta name="topic" content="Посольские услуги MDCard, ВНЖ РФ молдаване, карта гражданина, консульская поддержка" />
        <meta name="summary" content="MDCard упрощает взаимодействие с Посольством Молдовы - ваш путь к ВНЖ РФ и консульским услугам" />
        <meta name="classification" content="Государственные услуги через карту гражданина" />
        <meta name="category" content="Дипломатические услуги и интеграция" />
        <meta name="coverage" content="Moscow Embassy, Moldova Citizens, MDCard Services" />
        <meta name="distribution" content="MDCard Holders, Moldovan Citizens in RF" />

        {/* УНИКАЛЬНЫЕ SOCIAL META */}
        <meta property="og:title" content="Посольство Молдовы в Москве через MDCard: ВНЖ РФ, карта гражданина" />
        <meta
          property="og:description"
          content="🏛️ Официальные посольские услуги через MDCard: ВНЖ РФ для граждан Молдовы, загранпаспорт, Reservio запись. Карта гражданина упрощает процесс ✅ 12,785+"
        />
        {/* <meta
          property="og:url"
          content="https://mdcard.ru/posolstvo-moldovy/"
        /> */}
        {/* <meta
          property="og:image"
          content="https://mdcard.ru/images/og-embassy-mdcard-moldova-1200x630.jpg"
        /> */}
        <meta property="og:image:alt" content="Посольство Молдовы через MDCard - карта гражданина и ВНЖ РФ" />

        {/* Связи с основным сайтом MDCard  */}
        <meta property="og:see_also" content="https://mdcard.ru/" />
        {/* <meta
          property="og:see_also"
          content="https://mdcard.ru/vnzh-rf-moldavy"
        /> */}
        {/* <meta
          property="og:see_also"
          content="https://mdcard.ru/zagranpasport-moldova"
        /> */}
        <meta property="og:see_also" content="https://mdcard.ru/" />

        <meta property="article:section" content="Посольские услуги MDCard" />
        <meta property="article:tag" content="карта гражданина молдовы" />
        <meta property="article:tag" content="посольство молдовы mdcard" />
        <meta property="article:tag" content="внж рф через mdcard" />
        <meta property="article:tag" content="кузнецкий мост 18" />
        <meta property="article:tag" content="запись посольство mdcard" />
        <meta property="article:tag" content="загранпаспорт mdcard" />
        <meta property="article:tag" content="консульские услуги mdcard" />
        <meta property="article:tag" content="reservio mdcard" />

        <meta name="twitter:title" content="Посольство Молдовы через MDCard: ВНЖ РФ, карта гражданина" />
        <meta
          name="twitter:description"
          content="Посольские услуги через карту гражданина MDCard: ВНЖ РФ, загранпаспорт, онлайн запись. 12,785+ граждан доверяют нам"
        />
        {/* <meta
          name="twitter:image"
          content="https://mdcard.ru/images/twitter-embassy-mdcard-1200x600.jpg"
        /> */}

        {/* УНИКАЛЬНАЯ ГЕО-ЛОКАЛИЗАЦИЯ */}
        <meta name="geo.placename" content="Кузнецкий мост 18, Москва, Посольство Молдовы, Рождественка 7" />
        <meta name="geo.position" content="55.7584;37.6250" />
        <meta name="ICBM" content="55.7584, 37.6250" />
        <meta name="geo.region" content="Moscow, RF" />

        {/* ПОСОЛЬСКИЕ СПЕЦИФИЧНЫЕ ТЕГИ */}
        <meta
          name="embassy_keywords"
          content="посольство молдовы mdcard, кузнецкий мост 18, карта гражданина посольство, запись онлайн mdcard, внж рф граждане молдовы mdcard, загранпаспорт mdcard, консульский отдел mdcard, республика молдова mdcard услуги, график работы посольства mdcard, телефон посольства mdcard, адрес посольства mdcard, гражданство молдовы mdcard, документы для посольства mdcard, онлайн запись mdcard, консульские услуги mdcard, интеграция граждан посольство"
        />
        <meta
          name="embassy-services"
          content="VNZh-MDCard, passport-MDCard, citizenship-MDCard, consular-MDCard, registration-MDCard, reservio-MDCard, card-holder-services"
        />
        <meta name="standout" content="https://mdcard.ru/ru/embassy" />
        <meta name="original-source" content="https://mdcard.ru/ru/embassy" />
        <meta name="application-name" content="MDCard - Посольство и Карта Гражданина Молдовы" />
        <meta name="mdcard-service-type" content="embassy-integration-services" />

        {/* СПЕЦИФИЧНЫЕ ССЫЛКИ */}
        <link rel="canonical" href="https://mdcard.ru/ru/embassy" />
        <link rel="alternate" type="application/rss+xml" title="Посольские услуги RSS" href="/embassy-services.xml" />

        {/*  Связи с услугами */}
        <link rel="related" href="/vnzh-rf-moldavy/" title="ВНЖ РФ для граждан Молдовы" />
        <link rel="related" href="/zagranpasport-moldova/" title="Загранпаспорт Молдовы" />
        <link rel="related" href="/konsulskie-uslugi/" title="Консульские услуги" />
        <link rel="related" href="/reservio-zapis/" title="Запись через Reservio" />

        {/* Альтернативные языки  */}
        <link rel="alternate" hrefLang="ru" href="/posolstvo-moldovy/" />
        <link rel="alternate" hrefLang="md" href="/md/ambasada-moldova/" />
      </>

      {/* EMBASSY SCHEMA */}
      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      {/* FAQ SCHEMA */}
      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(FAQschema)}7
      </Script>

      {/* Яндекс.Метрика */}
      {/* <Script id="embassy-mdcard-yandex" strategy="afterInteractive">
        {`
          ym(12345678, 'params', {
            'page_type': 'embassy_services_mdcard',
            'embassy_location': 'moscow_kuzneckiy_most_18',
            'mdcard_integration': 'embassy_services_official',
            'unique_services': 'vnzh_rf_moldova_citizens_mdcard',
            'booking_system': 'reservio_mdcard_integration',
            'target_audience': 'mdcard_holders_moldovan_citizens',
            'service_categories': 'vnzh_mdcard,passport_mdcard,consular_mdcard,citizenship_mdcard',
            'redirect_source': 'mdcard_main_site'
          });

          ym(12345678, 'reachGoal', 'embassy_via_mdcard_visit');
          ym(12345678, 'reachGoal', 'vnzh_rf_mdcard_holders');
          ym(12345678, 'reachGoal', 'reservio_booking_mdcard');
          ym(12345678, 'reachGoal', 'embassy_redirect_from_main');
        `}
      </Script> */}

      {/* Google Analytics */}
      {/* <Script id="embassy-mdcard-ga" strategy="afterInteractive">
        {`
          gtag('event', 'embassy_mdcard_service', {
            'event_category': 'MDCard Embassy Services',
            'event_label': 'Moldova Embassy Moscow MDCard',
            'embassy_address': 'kuzneckiy_most_18',
            'unique_service': 'vnzh_rf_moldova_mdcard',
            'card_holder_context': 'true'
          });

          gtag('event', 'vnzh_rf_mdcard_unique', {
            'event_category': 'MDCard Migration Services',
            'event_label': 'VNZh RF Moldova Citizens MDCard Exclusive',
            'service_provider': 'mdcard_embassy_official_partner',
            'redirect_context': 'main_site_embassy_section'
          });

          gtag('event', 'main_site_embassy_redirect', {
            'event_category': 'MDCard Site Navigation',
            'event_label': 'Main Site to Embassy Services',
            'integration_type': 'seamless_redirect'
          });+
        `}
      </Script> */}

      {/* Микроданные */}
      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(MicroData)}
      </Script>
    </div>
  );
}
