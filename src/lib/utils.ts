// دوال صغيرة بنستخدمها كتير في الموقع

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
