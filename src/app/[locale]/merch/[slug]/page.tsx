import ProductClient from "@/components/merch/productClient/ProductClient";
import { merchDetail } from "@/constant/merch/merchDetail";
import { MerchItem } from "@/types/merch";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = merchDetail.find((p) => p.slug === slug) as MerchItem;

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
