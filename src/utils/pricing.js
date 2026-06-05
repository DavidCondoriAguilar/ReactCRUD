export function getPricing(product) {
  const originalPrice = parseFloat(product?.precio) || 0;
  const discountedPrice = parseFloat(product?.preciorebajado) || 0;
  const hasDiscount = discountedPrice > 0;
  const effectivePrice = hasDiscount ? discountedPrice : originalPrice;
  const discountPercent = hasDiscount
    ? ((1 - discountedPrice / originalPrice) * 100).toFixed(0)
    : 0;

  return { originalPrice, discountedPrice, hasDiscount, effectivePrice, discountPercent };
}
