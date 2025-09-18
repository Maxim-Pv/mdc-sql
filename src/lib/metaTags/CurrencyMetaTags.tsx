import Script from "next/script";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ExchangeRateSpecification",
  name: "Курс валют молдавского лея",
  description: "Актуальные курсы обмена молдавского лея к рублю, евро, доллару и другим валютам",
  url: "https://mdcard.ru/ru/currency",
  currency: "MDL",
  currentExchangeRate: [
    {
      "@type": "UnitPriceSpecification",
      price: "[динамическое значение]",
      priceCurrency: "RUB",
      name: "Курс лея к рублю",
    },
    {
      "@type": "UnitPriceSpecification",
      price: "[динамическое значение]",
      priceCurrency: "EUR",
      name: "Курс лея к евро",
    },
    {
      "@type": "UnitPriceSpecification",
      price: "[динамическое значение]",
      priceCurrency: "USD",
      name: "Курс лея к доллару",
    },
  ],
  validFrom: "[текущая дата]",
  validThrough: "[дата + 1 день]",
  provider: {
    "@type": "Organization",
    // "@id": "https://mdcard.ru/#organization",
    name: "MDCard.ru",
    url: "https://mdcard.ru",
    sameAs: [
      "https://vk.com/moldovacard",
      "https://ok.ru/group/70000007749717",
      "https://www.instagram.com/moldovacard",
      "https://www.facebook.com/moldovacard",
      "https://dzen.ru/id/6853d7532a9f4e7683258d63",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "presscard@mdcard.ru",
      contactType: "customer service",
      availableLanguage: ["Russian", "Romanian"],
    },
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Республика Молдова",
    },
    {
      "@type": "Country",
      name: "Российская Федерация",
    },
    {
      "@type": "Place",
      name: "Приднестровская Молдавская Республика",
    },
  ],
  audience: {
    "@type": "PeopleAudience",
    audienceType: "Пользователи валютных операций",
  },
  mainEntity: {
    "@type": "WebApplication",
    name: "Конвертер валют лей",
    description: "Онлайн калькулятор для конвертации молдавского лея",
    applicationCategory: "Finance",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MDL",
      availability: "https://schema.org/InStock",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://mdcard.ru",
      },
      // {
      //   "@type": "ListItem",
      //   position: 2,
      //   name: "Услуги",
      //   item: "https://mdcard.ru/services/",
      // },
      {
        "@type": "ListItem",
        position: 3,
        name: "Курс валют лей",
        item: "https://mdcard.ru/ru/currency",
      },
    ],
  },
};

export default function CurrencyMetaTags() {
  return (
    <>
      <title>Курс валют лей к рублю, евро, доллару | mdcard.ru</title>
      <meta
        name="description"
        content="Актуальный курс валют молдавского лея к рублю, евро, доллару. Конвертер валют онлайн. Курс лея в банках ПМР, Кишинева. Льготы для держателей карт"
      ></meta>
      <meta
        name="keywords"
        content="курс валют лей, молдавский лей, курс лея к рублю, курс лея к евро, курс лея к доллару, курс валют на сегодня лей, курс валют рубль молдавский лей, курс лея в пмр, курс лея к доллару в молдове, 6 долларов в леях, 9 долларов в леях, курс лея в тирасполе, курс лея в кишиневе, конвертер валют лей, обмен валют лей, курс покупки лей, курс продажи лей, национальный банк молдовы, межбанковский курс лей, валютные операции молдова, котировки лей, курсовая разница лей, обменные пункты молдова, валютный рынок молдовы, кросс курс лей, динамика курса лея, прогноз курса лея, исторический курс лея, курс лея приднестровье, банки молдовы курс, сбербанк пмр курс лея, лучший курс обмена лей, где обменять рубли на леи, калькулятор валют лей рубль, курс лея реальное время, онлайн курс лея"
      ></meta>

      {/* РАСШИРЕННАЯ АВТОРСКАЯ ИНФОРМАЦИЯ */}

      <meta name="author" content="Карта гражданина Молдовы | Курсы валют | Официальный портал mdcard.ru" />
      <meta name="publisher" content="MDCard.ru | Финансовые услуги для граждан Молдовы" />
      <meta name="copyright" content="© 2024-2025 mdcard.ru. Курсы валют молдавский лей. Все права защищены" />
      <meta name="owner" content="mdcard.ru" />
      <meta name="reply-to" content="presscard@mdcard.ru" />
      <meta name="generator" content="Currency Exchange Platform v1.0" />
      <meta name="designer" content="MDCard Currency Team" />
      <meta name="subject" content="Курс валют молдавского лея: рубль, евро, доллар, конвертер валют, обмен" />
      <meta
        name="abstract"
        content="Актуальные курсы валют молдавского лея к основным мировым валютам с возможностью конвертации и поиска выгодных обменников"
      />
      <meta name="topic" content="Финансовые услуги, валютные операции, обмен валют, курсы валют, конвертер валют" />
      <meta
        name="summary"
        content="Курс валют лей - актуальная информация о котировках молдавского лея к рублю, евро, доллару с инструментами конвертации"
      />
      <meta name="classification" content="Финансовые услуги" />
      <meta name="category" content="Валютные операции" />
      <meta name="coverage" content="Moldova, Russia, Ukraine, PMR" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="1 hours" />

      {/* МАКСИМАЛЬНЫЙ OPEN GRAPH */}

      <meta property="og:title" content="Актуальный курс молдавского лея к рублю, евро, доллару | Конвертер валют" />
      <meta
        property="og:description"
        content="💱 Узнайте курс лея к рублю, евро, доллару. Конвертер валют и калькулятор обмена. Курсы в банках ПМР, Кишинева. Льготы для держателей карт гражданина Молдовы"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mdcard.ru/ru/currency" />
      <meta property="og:site_name" content="MDCard.ru | Курсы валют молдавский лей" />
      {/* <meta
        property="og:image"
        content="https://mdcard.ru/images/currency-rates-preview-1200x630.jpg"
      /> */}
      {/* <meta
        property="og:image:secure_url"
        content="https://mdcard.ru/images/currency-rates-preview-1200x630.jpg"
      /> */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="Курс валют молдавского лея - актуальные котировки к рублю, евро, доллару" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="ro_MD" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:updated_time" content="2025-01-01T00:00:00Z" />
      {/* <meta property="og:see_also" content="https://mdcard.ru/sberbank-pmr" /> */}
      {/* <meta
        property="og:see_also"
        content="https://mdcard.ru/pension-support"
      />
      <meta property="og:see_also" content="https://mdcard.ru/" /> */}

      {/* РАСШИРЕННАЯ ИНФОРМАЦИЯ О СТАТЬЕ */}

      <meta property="article:author" content="MDCard.ru Currency Team" />
      <meta property="article:publisher" content="mdcard.ru" />
      <meta property="article:section" content="Финансовые услуги" />
      <meta property="article:tag" content="курс валют" />
      <meta property="article:tag" content="молдавский лей" />
      <meta property="article:tag" content="конвертер валют" />
      <meta property="article:tag" content="обмен валют" />
      <meta property="article:tag" content="курс лея к рублю" />
      <meta property="article:tag" content="курс лея к евро" />
      <meta property="article:tag" content="курс лея к доллару" />
      <meta property="article:tag" content="банки молдовы" />
      <meta property="article:tag" content="пмр курсы" />
      <meta property="article:published_time" content="2024-01-15T00:00:00Z" />
      <meta property="article:modified_time" content="2025-01-01T00:00:00Z" />

      {/* TWITTER CARDS */}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Курс молдавского лея сегодня | Конвертер валют" />
      <meta name="twitter:description" content="Актуальные курсы валют лея к основным валютам мира. Конвертер и калькулятор обмена" />
      {/* <meta
        name="twitter:image"
        content="https://mdcard.ru/images/currency-rates-preview-1200x630.jpg"
      /> */}
      <meta name="twitter:image:alt" content="Курс валют молдавский лей" />

      {/* ДИЗАЙН И ТЕМА */}

      <meta name="theme-color" content="#00B050" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#00B050" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#008A3A" />
      <meta name="msapplication-TileColor" content="#00B050" />
      <meta name="msapplication-navbutton-color" content="#00B050" />
      <meta name="msapplication-starturl" content="/currency-rates/" />
      <meta name="msapplication-window" content="width=1024;height=768" />
      <meta name="msapplication-tooltip" content="Курс валют молдавского лея - актуальные котировки" />

      {/* ТЕХНИЧЕСКИЕ ССЫЛКИ */}

      <link rel="canonical" href="https://mdcard.ru/ru/currency" />
      {/* <link
        rel="alternate"
        type="application/rss+xml"
        title="Курсы валют лей RSS"
        href="https://mdcard.ru/ru/currency/rss.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="Обновления курсов лей"
        href="https://mdcard.ru/ru/currency/atom.xml"
      /> */}

      {/* МНОГОЯЗЫЧНОСТЬ */}

      <link rel="alternate" hrefLang="ru" href="https://mdcard.ru/ru/currency" />
      <link rel="alternate" hrefLang="ru-RU" href="https://mdcard.ru/ru/currency" />
      <link rel="alternate" hrefLang="md" href="https://mdcard.ru/md/currency" />
      <link rel="alternate" hrefLang="md-MD" href="https://mdcard.ru/md/currency" />

      <link rel="alternate" hrefLang="x-default" href="https://mdcard.ru/ru/currency" />

      {/* ДОПОЛНИТЕЛЬНАЯ SEO ИНФОРМАЦИЯ */}

      <meta name="news_keywords" content="курс валют лей, молдавский лей, конвертер валют, обмен валют, курс лея, банки молдовы, пмр курсы" />
      <meta name="standout" content="https://mdcard.ru/ru/currency" />
      <meta name="syndication-source" content="https://mdcard.ru/ru/currency" />
      <meta name="original-source" content="https://mdcard.ru/ru/currency" />
      <meta name="application-name" content="Курс валют молдавский лей" />

      {/* МАКСИМАЛЬНАЯ SCHEMA.ORG РАЗМЕТКА */}
      <Script id="schema-json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaData)}
      </Script>

      {/* ЯНДЕКС.МЕТРИКА */}
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
            'page_type': 'currency_rates',
            'content_category': 'financial_services', 
            'currency_focus': 'moldovan_leu'
          });

          ym(12345678, 'reachGoal', 'currency_page_view');
        `}
      </Script> */}

      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/12345678" style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div>
      </noscript>

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
            'page_title': 'Курс валют лей | MDCard.ru',
            'page_location': 'https://mdcard.ru/ru/currency',
            'content_group1': 'Финансовые услуги',
            'content_group2': 'Курсы валют',
            'content_group3': 'Молдавский лей',
            'content_group4': 'Конвертер валют'
                      }
                    });

                    gtag('event', 'page_view', {
                      'page_title': 'Курс валют лей',
            'content_category': 'financial_services',
            'currency_type': 'moldovan_leu'
                    });

                    gtag('event', 'main_page_visit', {
                      'event_category': 'Financial Tools',
            'event_label': 'Currency Converter',
            'currency_pair': 'MDL_RUB'
          });
        `}
      </Script> */}

      {/* ОТСЛЕЖИВАНИЕ ВЗАИМОДЕЙСТВИЙ С КОНВЕРТЕРОМ */}
      {/* <Script id="converter-tracking" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', function () {
            const converterInputs = document.querySelectorAll('.currency-converter input');
            converterInputs.forEach(input => {
              input.addEventListener('change', function () {
                if (typeof ym === 'function') {
                  ym(12345678, 'reachGoal', 'currency_conversion');
                }
                if (typeof gtag === 'function') {
                  gtag('event', 'conversion_used', {
                    'event_category': 'Currency Tools',
                    'conversion_type': this.dataset.currency || 'unknown'
                  });
                }
              });
            });

            const currencyBlocks = document.querySelectorAll('.currency-rate-block');
            currencyBlocks.forEach(block => {
              block.addEventListener('click', function () {
                const currency = this.dataset.currency;
                if (typeof ym === 'function') {
                  ym(12345678, 'reachGoal', 'currency_rate_view', { 'currency': currency });
                }
                if (typeof gtag === 'function') {
                  gtag('event', 'rate_view', {
                    'event_category': 'Currency Interest',
                    'currency_code': currency
                  });
                }
              });
            });
          });
        `}
      </Script> */}
    </>
  );
}
