export function calcWeight(items: { qty: number }[]) {
  const ONE_TSHIRT_G = 200;
  return items.reduce((sum, it) => sum + it.qty * ONE_TSHIRT_G, 0);
}
