export const newsMdxMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  '2025-09-03-druta': () => import('@/constant/news/2025-09-03-druta.mdx'),
  '2025-09-05-prizes': () => import('@/constant/news/2025-09-05-prizes.mdx'),
  '2025-09-06-varvus': () => import('@/constant/news/2025-09-06-varvus.mdx'),
  '2025-08-23-istoricheskii-kviz': () => import('@/constant/news/2025-08-23-istoricheskii-kviz.mdx'),
  // добавить сюда новые:
  // "2025-09-06-varvus": () => import("./2025-09-06-varvus.mdx"),
};
