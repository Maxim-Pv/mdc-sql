import NewsPage from '@/components/pages/news/NewsPage';
import { requireAdmin } from '@/lib/admin/auth.server';

export default async function Page() {
  const admin = await requireAdmin();
  const canCreate = !!admin;

  return <NewsPage canCreate={canCreate} />;
}
