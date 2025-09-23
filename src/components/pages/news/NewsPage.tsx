'use client';

import PatternTitle from '@/components/culture/patternTitle/PatternTitle';
import HeaderNav from '@/components/headerNav/HeaderNav';
import ContentFeed from '@/components/news/contentFeed/ContendFeed';
import NewsHeroBlock from '@/components/news/heroBlock/NewsHeroBlock';
import NewsMetaTags from '@/lib/metaTags/NewsMetaTags';
import { useState } from 'react';

export default function NewsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <NewsMetaTags />
      <div className="flex min-h-[100vh] flex-col gap-[40px] bg-white pb-25 sm:gap-[70px]">
        <HeaderNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <NewsHeroBlock />
        <PatternTitle title={`последние мероприятия и\u00A0акции`} />
        <ContentFeed kind="events" pageSize={4} />
        <PatternTitle title="популярные новости молдовы" />
        <ContentFeed kind="news" pageSize={6} />
      </div>
    </>
  );
}
