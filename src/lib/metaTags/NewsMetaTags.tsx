import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "@id": "#mdcard-news",
  name: "MDCard - Новости Молдовы для диаспоры в России",
  alternateName: ["MDCard News", "МДКард Новости", "Новости для молдаван в РФ"],
  description: "Новостная служба MDCard - актуальные новости Молдовы для граждан, проживающих в России",
  url: "https://mdcard.ru/",
  parentOrganization: {
    "@type": "Organization",
    name: "MDCard - Интеграция граждан Молдовы в России",
    url: "https://mdcard.ru/",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+7-800-123-45-67",
      contactType: "customer service",
      availableLanguage: ["Romanian", "Russian", "English"],
      hoursAvailable: "Mo-Su 00:00-23:59",
    },
    {
      "@type": "ContactPoint",
      email: "news@mdcard.ru",
      contactType: "editorial",
      availableLanguage: ["Romanian", "Russian", "English"],
    },
  ],
  areaServed: [
    {
      "@type": "Country",
      name: "Российская Федерация",
    },
    {
      "@type": "Place",
      name: "Приднестровская Молдавская Республика",
    },
    {
      "@type": "Country",
      name: "Республика Молдова",
    },
  ],
  audience: {
    "@type": "PeopleAudience",
    audienceType: "Граждане Молдовы в России",
    geographicArea: [
      {
        "@type": "Country",
        name: "Российская Федерация",
      },
    ],
    requiredMinAge: 16,
  },
  mainEntity: {
    "@type": "WebSite",
    "@id": "https://mdcard.ru/ru/news/",
    name: "Новости Молдовы для диаспоры в России",
    description: "Свежие новости Молдовы для граждан в РФ - MDCard",
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: "https://mdcard.ru/search?q={search_term}",
    //   "query-input": "required name=search_term",
    // },
  },
};
export default function NewsMetaTags() {
  return (
    <div>
      <>
        <title>Новости Молдовы сегодня на русском языке | MDCard - интеграция граждан в России</title>
        <meta
          name="description"
          content="⚡ Новости Молдовы для граждан в России: политика Санду, выборы, курс валют ПМР, интеграция в РФ. MDCard помогает молдаванам 24/7  40,831+ читателей"
        />
        <meta
          name="keywords"
          content="новости молдовы, новости молдовы на сегодня, новости молдовы на русском, последние новости молдовы, свежие новости молдовы, новости молдова сегодня на русском, карта гражданина молдовы, mdcard, интеграция молдаван в россии, новости для молдаван в рф, новости молдовы 2025, новости молдовы поинт, новости молдова point, поинт мд новости молдова, новости молдовы украины россии, новости молдовы политика, новости молдовы санду, молдова новости курс валюты, новости молдовы выборы, новости молдовы гагаузии, новости бельца молдова, новости молдовы приднестровья, криминальные новости молдовы, новости молдовы дзен, kp md новости молдовы, новости молдовы комсомольская правда, молдаване в россии новости, диаспора молдовы новости"
        />

        {/* АВТОРСТВО И ПУБЛИКАЦИЯ */}
        <meta name="author" content="MDCard - Интеграция граждан Молдовы в России | Новостной отдел" />
        <meta name="publisher" content="MDCard.ru - Официальный портал поддержки граждан Молдовы в РФ" />
        <meta name="subject" content="Новости Молдовы для граждан в России: политика, интеграция, поддержка диаспоры" />
        <meta name="abstract" content="Актуальные новости Молдовы для молдавской диаспоры в России - политика, экономика, интеграционные процессы" />
        <meta name="topic" content="Новости Молдовы, интеграция в России, поддержка диаспоры, социальные услуги" />
        <meta name="summary" content="Свежие новости Молдовы для граждан, проживающих в России - ваша связь с Родиной" />
        <meta name="classification" content="Новости и поддержка диаспоры" />
        <meta name="category" content="Информационно-социальный портал" />
        <meta name="coverage" content="Moldova, Russia, PMR, Diaspora" />
        <meta name="distribution" content="Russian Federation, Moldova" />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="Новости Молдовы для граждан в России | MDCard - ваша связь с Родиной" />
        <meta
          property="og:description"
          content="🇲🇩 Последние новости Молдовы для молдавской диаспоры в РФ. Политика, интеграция, поддержка. MDCard объединяет 40,831+ соотечественников ✅"
        />
        <meta property="og:url" content="https://mdcard.ru/ru/news" />
        <meta property="og:site_name" content="MDCard | Интеграция граждан Молдовы в России" />
        {/* <meta
          property="og:image"
          content="https://mdcard.ru/images/og-news-moldova-russia-1200x630.jpg"
        /> */}
        <meta property="og:image:alt" content="Новости Молдовы для граждан в России - MDCard" />

        {/* Специфичные связи */}
        <meta property="og:see_also" content="https://mdcard.ru/" />
        {/* <meta property="og:see_also" content="https://mdcard.ru/sberbank-pmr" /> */}
        {/* <meta
          property="og:see_also"
          content="https://mdcard.ru/pension-support"
        />
        <meta
          property="og:see_also"
          content="https://mdcard.ru/integration-help"
        /> */}

        {/* КОНТЕНТ СТАТЬИ */}
        <meta property="article:author" content="Редакция MDCard" />
        <meta property="article:publisher" content="MDCard - Интеграция граждан Молдовы в России" />
        <meta property="article:section" content="Новости для диаспоры" />
        <meta property="article:tag" content="новости молдовы" />
        <meta property="article:tag" content="mdcard" />
        <meta property="article:tag" content="интеграция в россии" />
        <meta property="article:tag" content="диаспора молдовы" />
        <meta property="article:tag" content="политика санду" />
        <meta property="article:tag" content="курс валют" />
        <meta property="article:tag" content="выборы молдова" />
        <meta property="article:tag" content="гагаузия новости" />
        <meta property="article:tag" content="приднестровье" />
        <meta property="article:tag" content="поддержка молдаван" />

        {/* TWITTER */}
        <meta name="twitter:title" content="Новости Молдовы для граждан в России | MDCard" />
        <meta name="twitter:description" content="Последние новости Молдовы для молдавской диаспоры в РФ. 40,831+ соотечественников с нами" />
        {/* <meta
          name="twitter:image"
          content="https://mdcard.ru/images/twitter-moldova-news-1200x600.jpg"
        /> */}
        <meta name="twitter:image:alt" content="Новости Молдовы для граждан в России - MDCard" />

        {/* ГЕО-ЛОКАЛИЗАЦИЯ */}
        <meta name="geo.placename" content="Кишинев, Тирасполь, Бендеры, Бельцы, Комрат, Кагул, Рыбница, Дубоссары, Григориополь, Слободзея" />
        <meta name="geo.position" content="47.0105;28.8638" />
        <meta name="ICBM" content="47.0105, 28.8638" />

        {/* НОВОСТНЫЕ META-ТЕГИ */}
        <meta
          name="news_keywords"
          content="новости молдовы, mdcard, интеграция в россии, диаспора молдовы, политика молдовы, экономика молдовы, санду, выборы молдова, курс лея, гагаузия, приднестровье, бельцы, кишинев, point md, комсомольская правда молдова, дзен молдова, поддержка молдаван в россии, карта гражданина молдовы"
        />
        <meta name="standout" content="https://mdcard.ru/ru/news" />
        <meta name="syndication-source" content="https://mdcard.ru/ru/news" />
        <meta name="original-source" content="https://mdcard.ru/ru/news" />
        <meta name="application-name" content="MDCard - Новости Молдовы" />

        {/* СПЕЦИФИЧНЫЕ ССЫЛКИ */}
        <link rel="canonical" href="https://mdcard.ru/ru/news" />
        <link rel="alternate" type="application/rss+xml" title="Новости Молдовы для диаспоры RSS" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Лента новостей MDCard" href="/feed.xml" />

        {/* Связь с основным сайтом */}
        <link rel="home" href="https://mdcard.ru/" />
        <link rel="up" href="https://mdcard.ru/" />

        {/* Региональные версии */}
        <link rel="alternate" hrefLang="ru" href="/novosti-moldovy/" />
        <link rel="alternate" hrefLang="md" href="/md/stiri-moldova/" />
        <link rel="alternate" hrefLang="en" href="/en/moldova-news/" />
        <link rel="alternate" hrefLang="x-default" href="/novosti-moldovy/" />
      </>

      {/* SCHEMA.ORG */}
      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      {/* Яндекс.Метрика */}
      {/* <Script id="news-mdcard-ym" strategy="afterInteractive">
        {`
          if (typeof ym === 'function') {
            ym(12345678, 'params', {
              page_type: 'news_main',
              content_category: 'moldova_news',
              news_language: 'russian',
              target_audience: 'moldovan_diaspora',
              news_topics: 'politics,economics,society',
              integration_context: 'mdcard_diaspora'
            });
            ym(12345678, 'reachGoal', 'news_main_page_view');
          }
        `}
      </Script> */}

      {/* Google Analytics */}
      {/* <Script id="news-mdcard-ga" strategy="afterInteractive">
        {`
          if (typeof gtag === 'function') {
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: 'Новости Молдовы для диаспоры | MDCard',
              content_group1: 'Новости',
              content_group2: 'Диаспора',
              content_group3: 'Молдова',
              content_group4: 'Интеграция'
            });
            gtag('event', 'diaspora_news_visit', {
              event_category: 'News Engagement',
              event_label: 'Moldova Diaspora News',
              news_context: 'integration_support'
            });
          }
        `}
      </Script> */}
    </div>
  );
}
