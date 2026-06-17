export const site = {
  name: "TEKNOVA",
  tagline: "حيث تتحول الأفكار إلى واقع رقمي",
  phone: "01033558125",
  whatsapp: "https://wa.me/201033558125",
};

export const services = [
  { id: "web", title: "Web Development", desc: "مواقع سريعة ومتجاوبة", icon: "🌐" },
  { id: "mobile", title: "Mobile Apps", desc: "تطبيقات Android و iOS", icon: "📱" },
  { id: "systems", title: "Software Systems", desc: "أنظمة ولوحات تحكم", icon: "⚙️" },
  { id: "uiux", title: "UI/UX Design", desc: "تصاميم تركز على المستخدم", icon: "🎨" },
  { id: "security", title: "Security", desc: "حماية متقدمة", icon: "🔒" },
  { id: "ai", title: "AI Solutions", desc: "حلول ذكاء اصطناعي", icon: "🧠" },
];

export const projects = [
  {
    title: "منصة تسوق",
    category: "Web",
    problem: "متجر تقليدي لا يدعم الدفع الإلكتروني",
    solution: "طورنا متجر متكامل بـ Next.js + Stripe",
    result: "زيادة مبيعات 300%",
    tech: "Next.js, Stripe, PostgreSQL",
  },
  {
    title: "تطبيق توصيل",
    category: "Mobile",
    problem: "تأخير في التوصيل وغياب التتبع",
    solution: "تطبيق بـ React Native مع GPS tracking",
    result: "توصيل أسرع 40%",
    tech: "React Native, Socket.io, Google Maps",
  },
  {
    title: "نظام إدارة",
    category: "Systems",
    problem: "إدارة يدوية تسبب أخطاء",
    solution: "dashboard متكامل مع تقارير لحظية",
    result: "توفير 20 ساعة أسبوعيًا",
    tech: "React, Node.js, PostgreSQL",
  },
];

export const team = [
  { name: "يوسف محمد", role: "CEO & Founder", bio: "مهندس برمجيات بخبرة في بناء الأنظمة المتكاملة", icon: "👨‍💻" },
  { name: "أحمد علي", role: "Frontend Lead", bio: "متخصص في React و Next.js وتجربة المستخدم", icon: "🎨" },
  { name: "محمد حسن", role: "Backend Lead", bio: "خبير في Node.js و PostgreSQL و APIs", icon: "⚙️" },
  { name: "سارة خالد", role: "UI/UX Designer", bio: "تصميم واجهات مستخدم حديثة وجذابة", icon: "✨" },
];

export const testimonials = [
  { content: "TEKNOVA حولوا فكرتنا لمنتج حقيقي في وقت قياسي. احترافية عالية.", name: "خالد عبدالله", role: "CEO, شركة نور" },
  { content: "أفضل فريق تعاملت معه في مجال البرمجة. الدعم الفني ممتاز.", name: "نورة سعيد", role: "مؤسسة متجر كلاود" },
  { content: "سرعتهم في التنفيذ والدقة في الشغل شيء خرافي. أنصح بالتعامل معهم.", name: "أحمد الراشد", role: "صاحب مشروع طبي" },
  { content: "موقعنا الجديد زاد المبيعات ٢٠٠٪. تجربة رقمية رائعة بفضل TEKNOVA.", name: "فهد المطيري", role: "مدير تسويق" },
];

export const packages = [
  { name: "Starter", price: 500, features: ["صفحة واحدة", "تصميم متجاوب", "SEO أساسي", "استضافة 3 شهور"] },
  { name: "Business", price: 1500, features: ["5 صفحات", "لوحة تحكم", "SEO متقدم", "دعم فني", "استضافة سنة"] },
  { name: "Enterprise", price: 3500, features: ["غير محدود", "نظام متكامل", "API مخصص", "أمان متقدم", "دعم 24/7"] },
];

export const siteTypes = [
  { id: "landing", label: "Landing Page", base: 300 },
  { id: "company", label: "Company Website", base: 800 },
  { id: "store", label: "E-Commerce", base: 1500 },
  { id: "system", label: "Software System", base: 2000 },
  { id: "app", label: "Mobile App", base: 3000 },
];

export const addons = [
  { id: "seo", label: "SEO", price: 200 },
  { id: "chat", label: "Live Chat", price: 300 },
  { id: "admin", label: "Admin Panel", price: 500 },
  { id: "multi", label: "Multi-Language", price: 400 },
  { id: "api", label: "API", price: 600 },
];
