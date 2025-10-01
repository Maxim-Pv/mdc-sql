import ProductClient from '@/components/merch/productClient/ProductClient';
import { findMerchBySlug } from '@/lib/merch';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = findMerchBySlug(slug);
  if (!product) return notFound();

  return <ProductClient product={product} />;
}
