import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Культура Молдовы",
  description:
    "Полная энциклопедия молдавской культуры: традиции, музыка, танцы, кухня, ремесла, архитектура",
  url: "УКАЗАТЬ_URL_СТРАНИЦЫ",
  mainEntity: {
    "@type": "Place",
    name: "Республика Молдова",
    description: "Страна с богатейшим культурным наследием в Восточной Европе",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Культурное наследие Молдовы",
      itemListElement: [
        {
          "@type": "Event",
          name: "Мэрцишор",
          description: "Традиционный молдавский весенний праздник 1 марта",
          startDate: "2025-03-01",
          location: {
            "@type": "Country",
            name: "Молдова",
          },
        },
        {
          "@type": "CreativeWork",
          name: "Молдавская народная музыка",
          description: "Традиционная музыка лэутаров, дойна, народные песни",
        },
        {
          "@type": "Dance",
          name: "Хора",
          description: "Традиционный молдавский круговой танец",
        },
        {
          "@type": "Recipe",
          name: "Мамалыга",
          description: "Традиционное молдавское блюдо из кукурузной муки",
        },
      ],
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "УКАЗАТЬ_ГЛАВНУЮ_URL",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги",
        item: "УКАЗАТЬ_УСЛУГИ_URL",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Культура Молдовы",
        item: "УКАЗАТЬ_URL_СТРАНИЦЫ",
      },
    ],
  },
  provider: {
    "@type": "Organization",
    name: "УКАЗАТЬ_НАЗВАНИЕ_ОРГАНИЗАЦИИ",
    url: "УКАЗАТЬ_URL_САЙТА",
  },
};

const FAQschema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Когда празднуют Мэрцишор в Молдове?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мэрцишор празднуют 1 марта каждый год. Это главный молдавский весенний праздник, символизирующий приход весны и обновление природы.",
      },
    },
    {
      "@type": "Question",
      name: "Что такое хора в молдавской культуре?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Хора - это традиционный молдавский круговой танец, объединяющий всех участников в едином ритме. Это самый популярный народный танец Молдовы.",
      },
    },
    {
      "@type": "Question",
      name: "Кто такие лэутары?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Лэутары - народные музыканты, веками сохранявшие и развивавшие молдавскую музыкальную культуру. Они играют традиционную музыку на свадьбах и праздниках.",
      },
    },
    {
      "@type": "Question",
      name: "Что такое мамалыга?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мамалыга - традиционное молдавское блюдо из кукурузной муки, основа национальной кухни. Подается с брынзой, сметаной или мясом.",
      },
    },
  ],
};

export default function CultureMetaTags() {
  return (
    <>
      <title>
        Культура Молдовы: традиции, музыка, танцы, кухня, праздники | mdcard.ru
      </title>
      <meta
        name="description"
        content="Богатая культура Молдовы: Мэрцишор, молдавская музыка лэутаров, танец хора, национальная кухня, народные промыслы, архитектура. Культурные льготы для держателей карт"
      />

      <meta
        name="keywords"
        content="культура молдовы, традиции молдовы, мэрцишор молдова, молдавская музыка, народная музыка молдовы, молдавские песни, лэутары молдова, дойна молдавская, молдавские танцы, хора молдавская, народные танцы молдовы, молдавский танец хора, сырба танец, молдавская кухня, традиционные блюда молдовы, молдавские блюда, мамалыга молдавская, плацинды молдавские, брынза молдавская, молдавские праздники, народные праздники молдовы, обычаи молдовы, молдавская свадьба, свадебные традиции молдовы, молдавские ковры, народные промыслы молдовы, молдавская керамика, традиционные ремесла молдовы, молдавская вышивка, архитектура молдовы, молдавские монастыри, церкви молдовы, исторические памятники молдовы, фольклор молдовы, молдавский язык, молдавская литература, молдавские писатели, культура республики молдова, министерство культуры молдовы, министр культуры молдовы, народная культура молдовы, культура в молдове, тв каналы молдовы, тв молдовы на русском, фестивали молдовы, культурные события молдовы, международный фестиваль мэрцишор, молдавская культура в россии, молдавские культурные центры, центр культуры молдовы в москве, молдавская диаспора культура, культура кишинев, культура тирасполь, приднестровская культура, молдавское телевидение, радио молдовы, молдавские фильмы, современная культура молдовы"
      />

      {/* АВТОРСКАЯ ИНФОРМАЦИЯ ПОТОМ ВСТАВИМ  */}
      <meta name="author" content="УКАЗАТЬ_АВТОРА" />
      <meta name="publisher" content="УКАЗАТЬ_ИЗДАТЕЛЯ" />
      <meta
        name="copyright"
        content="© 2024-2025 УКАЗАТЬ_ДОМЕН. Культура Молдовы. Все права защищены"
      />
      <meta name="owner" content="УКАЗАТЬ_ВЛАДЕЛЬЦА" />
      <meta name="reply-to" content="УКАЗАТЬ_EMAIL" />
      <meta name="generator" content="Cultural Heritage Platform v1.0" />
      <meta name="designer" content="УКАЗАТЬ_КОМАНДУ" />
      <meta
        name="subject"
        content="Культура Молдовы: традиции, музыка, танцы, кухня, праздники, ремесла, архитектура"
      />
      <meta
        name="abstract"
        content="Полная энциклопедия молдавской культуры: от древних традиций до современных фестивалей, включая музыку, танцы, кухню и народные промыслы"
      />
      <meta
        name="topic"
        content="Культурное наследие, молдавские традиции, народное творчество, культурные мероприятия"
      />
      <meta
        name="summary"
        content="Культура Молдовы - богатое наследие: Мэрцишор, лэутары, хора, мамалыга, традиционные ремесла, архитектура"
      />
      <meta name="classification" content="Культурные услуги" />
      <meta name="category" content="Молдавская культура и традиции" />
      <meta name="coverage" content="Moldova, Russia, Ukraine" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      {/* OPEN GRAPH ТОЖЕ ПЕРЕПРОВЕРИМ И ВСТАВИМ */}
      <meta
        property="og:title"
        content="Культура Молдовы: традиции, музыка, танцы, кухня | Полный гид по наследию"
      />
      <meta
        property="og:description"
        content="🎭 Богатая культура Молдовы: Мэрцишор, музыка лэутаров, танец хора, мамалыга, традиционные ремесла, архитектура. Культурные льготы для держателей карт"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="УКАЗАТЬ_ПОЛНЫЙ_URL_СТРАНИЦЫ" />
      <meta property="og:site_name" content="УКАЗАТЬ_НАЗВАНИЕ_САЙТА" />
      <meta property="og:image" content="УКАЗАТЬ_URL_ИЗОБРАЖЕНИЯ_1200x630" />
      <meta
        property="og:image:secure_url"
        content="УКАЗАТЬ_URL_ИЗОБРАЖЕНИЯ_1200x630"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="og:image:alt"
        content="Культура Молдовы - традиции, музыка, танцы, кухня, ремесла"
      />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="ro_MD" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:updated_time" content="2025-01-01T00:00:00Z" />

      {/* TWITTER CARDS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Культура Молдовы: традиции, музыка, танцы, кухня"
      />
      <meta
        name="twitter:description"
        content="Полный гид по молдавской культуре: Мэрцишор, лэутары, хора, мамалыга, традиционные ремесла. Богатое наследие и современные традиции"
      />
      <meta name="twitter:image" content="УКАЗАТЬ_URL_ИЗОБРАЖЕНИЯ_1200x630" />
      <meta
        name="twitter:image:alt"
        content="Культура Молдовы - полное культурное наследие"
      />

      {/* ДИЗАЙН И ТЕМА */}
      <meta name="theme-color" content="#D4AF37" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#D4AF37"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#B8860B"
      />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="msapplication-navbutton-color" content="#D4AF37" />
      <meta name="msapplication-starturl" content="УКАЗАТЬ_СТАРТОВЫЙ_URL" />
      <meta name="msapplication-window" content="width=1024;height=768" />
      <meta
        name="msapplication-tooltip"
        content="Культура Молдовы - традиции, музыка, танцы, кухня"
      />

      {/* НАСТРОЙКА APPLE */}
      <meta name="apple-mobile-web-app-title" content="Культура Молдовы" />

      {/* ТЕХНИЧЕСКИЕ ССЫЛКИ URL ВСТАВИМ КАК ЗАЛЬЕМ */}
      <link rel="canonical" href="УКАЗАТЬ_КАНОНИЧЕСКИЙ_URL" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Культура Молдовы RSS"
        href="УКАЗАТЬ_RSS_URL"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="Культурные события Молдовы"
        href="УКАЗАТЬ_ATOM_URL"
      />

      {/* ДОПОЛНИТЕЛЬНАЯ SEO ИНФОРМАЦИЯ */}
      <meta
        name="news_keywords"
        content="культура молдовы, мэрцишор, молдавская музыка, молдавские танцы, молдавская кухня, традиции молдовы"
      />
      <meta name="standout" content="УКАЗАТЬ_URL_СТРАНИЦЫ" />
      <meta name="syndication-source" content="УКАЗАТЬ_URL_СТРАНИЦЫ" />
      <meta name="original-source" content="УКАЗАТЬ_URL_СТРАНИЦЫ" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta
        name="format-detection"
        content="telephone=yes, email=yes, address=yes"
      />
      <meta name="application-name" content="Культура Молдовы" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* ПРОВЕРЕННАЯ SCHEMA.ORG РАЗМЕТКА */}
      <Script
        id="schema-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(schemaData)}
      </Script>

      {/* FAQ SCHEMA (ПРОВЕРЕННЫЕ ВОПРОСЫ) */}
      <Script
        id="schema-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(FAQschema)}
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
            trackHash:true,
            ecommerce:"dataLayer",
            triggerEvent:true
          });

          ym(12345678, 'params', {
            'page_type': 'culture_complete',
            'content_category': 'moldovan_heritage', 
            'culture_focus': 'comprehensive_guide'
          });

          ym(12345678, 'reachGoal', 'culture_complete_view');
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
            'page_title': 'Культура Молдовы - полный гид',
            'content_group1': 'Культурные услуги',
            'content_group2': 'Молдавская культура',
            'content_group3': 'Полный гид по культуре'
            }
          });

          gtag('event', 'page_view', {
             'page_title': 'Культура Молдовы - полный гид',
             'content_category': 'cultural_heritage'
          });
        `}
      </Script> */}
    </>
  );
}

// ### ОБЯЗАТЕЛЬНО ЗАМЕНИТЬ:
// 1. **УКАЗАТЬ_АВТОРА** -  имя/организация
// 2. **УКАЗАТЬ_ИЗДАТЕЛЯ** - название компании
// 3. **УКАЗАТЬ_ДОМЕН** -  домен
// 4. **УКАЗАТЬ_EMAIL** - контактный email
// 5. **УКАЗАТЬ_КОМАНДУ** - название команды
// 6. **УКАЗАТЬ_ПОЛНЫЙ_URL_СТРАНИЦЫ** - URL этой страницы
// 7. **УКАЗАТЬ_НАЗВАНИЕ_САЙТА** - название вашего сайта
// 8. **УКАЗАТЬ_URL_ИЗОБРАЖЕНИЯ_1200x630** - превью изображение
// 9. **УКАЗАТЬ_НОМЕР_СЧЕТЧИКА** - номер Яндекс.Метрики
// 10. **УКАЗАТЬ_GA4_КОД** - код Google Analytics

// ### РЕКОМЕНДУЕТСЯ ПРОВЕРИТЬ:
// 1. Частотность всех ключевых слов в keywords
// 2. Актуальные URL всех internal ссылок
// 3. Существование RSS/Atom фидов
// 4. Наличие мультиязычных версий
