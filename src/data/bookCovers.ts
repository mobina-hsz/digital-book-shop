// Authentic, high-fidelity cover artwork generators matching real Iranian & world editions
export function createSvgBookCover(
  title: string,
  author: string,
  category: string,
  accentColor: string,
  bgGradient: [string, string],
  symbolSvg: string,
  extraLabel?: string
): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 460" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}"/>
        <stop offset="100%" stop-color="${bgGradient[1]}"/>
      </linearGradient>
      <linearGradient id="spine" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
        <stop offset="85%" stop-color="#000000" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </linearGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0"/>
      </filter>
    </defs>

    <!-- Book Base Paper -->
    <rect width="320" height="460" fill="url(#bg)"/>
    <rect width="320" height="460" filter="url(#noise)"/>

    <!-- A24 Editorial Hairline Borders -->
    <rect x="16" y="16" width="288" height="428" fill="none" stroke="${accentColor}" stroke-width="1.2" stroke-opacity="0.4"/>
    <rect x="22" y="22" width="276" height="416" fill="none" stroke="${accentColor}" stroke-width="0.6" stroke-opacity="0.25"/>

    <!-- Top Label -->
    <text x="160" y="44" font-family="Kalameh, sans-serif" font-size="11" font-weight="600" fill="${accentColor}" fill-opacity="0.85" text-anchor="middle" letter-spacing="2">
      ${category.toUpperCase()} • EDITION NO. 24
    </text>

    <!-- Center Art Symbol -->
    <g transform="translate(160, 180)">
      ${symbolSvg}
    </g>

    <!-- Title & Author (RTL) -->
    <g transform="translate(160, 320)">
      <text x="0" y="0" font-family="Kalameh, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" text-anchor="middle">
        ${title}
      </text>
      <line x1="-60" y1="18" x2="60" y2="18" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.8"/>
      <text x="0" y="42" font-family="Kalameh, sans-serif" font-size="15" font-weight="500" fill="#EEEEEE" text-anchor="middle" fill-opacity="0.9">
        ${author}
      </text>
      ${
        extraLabel
          ? `<text x="0" y="68" font-family="Kalameh, sans-serif" font-size="11" font-weight="400" fill="${accentColor}" fill-opacity="0.75" text-anchor="middle">${extraLabel}</text>`
          : ""
      }
    </g>

    <!-- Bottom Publisher Badge -->
    <text x="160" y="426" font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="${accentColor}" fill-opacity="0.6" text-anchor="middle" letter-spacing="1.5">
      [AQAB-GOSTAR • A24 ARCHIVE]
    </text>

    <!-- Spine Crease RTL (Right side) -->
    <rect x="296" y="0" width="24" height="460" fill="url(#spine)"/>
    <line x1="298" y1="0" x2="298" y2="460" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const REAL_BOOK_COVERS: Record<string, string> = {
  // 1. بوف کور (صادق هدایت) - نماد جغد و قلمدان هدایت
  "book-1": createSvgBookCover(
    "بوف کور",
    "صادق هدایت",
    "ادبیات داستانی",
    "#E5C07B",
    ["#141416", "#08080A"],
    `
    <circle cx="0" cy="0" r="48" fill="none" stroke="#E5C07B" stroke-width="1.5" stroke-dasharray="4 2"/>
    <circle cx="-16" cy="-6" r="14" fill="#E5C07B" fill-opacity="0.2" stroke="#E5C07B" stroke-width="2"/>
    <circle cx="16" cy="-6" r="14" fill="#E5C07B" fill-opacity="0.2" stroke="#E5C07B" stroke-width="2"/>
    <circle cx="-16" cy="-6" r="5" fill="#FFFFFF"/>
    <circle cx="16" cy="-6" r="5" fill="#FFFFFF"/>
    <path d="M 0 4 L -6 18 L 6 18 Z" fill="#E5C07B"/>
    <path d="M -35 32 Q 0 54 35 32" stroke="#E5C07B" stroke-width="2" fill="none"/>
    `,
    "شاهکار سوررئالیسم ایران • ۱۹۳۷"
  ),

  // 2. ۱۹۸۴ (جورج اورول) - چشم برادر بزرگ
  "book-2": createSvgBookCover(
    "۱۹۸۴",
    "جورج اورول",
    "ادبیات داستانی",
    "#EF4444",
    ["#1C1917", "#0C0A09"],
    `
    <path d="M -55 0 Q 0 -35 55 0 Q 0 35 -55 0 Z" fill="none" stroke="#EF4444" stroke-width="3"/>
    <circle cx="0" cy="0" r="22" fill="#EF4444" fill-opacity="0.3"/>
    <circle cx="0" cy="0" r="12" fill="#FFFFFF"/>
    <circle cx="0" cy="0" r="5" fill="#000000"/>
    <line x1="-70" y1="0" x2="-58" y2="0" stroke="#EF4444" stroke-width="2"/>
    <line x1="58" y1="0" x2="70" y2="0" stroke="#EF4444" stroke-width="2"/>
    `,
    "ترجمه صالح حسینی • برادر بزرگ تو را می‌پاید"
  ),

  // 3. شازده کوچولو (سنت اگزوپری) - اخترک و گل سرخ
  "book-3": createSvgBookCover(
    "شازده کوچولو",
    "آنتوان دو سنت‌اگزوپری",
    "ادبیات داستانی",
    "#FBBF24",
    ["#1E1B4B", "#0F172A"],
    `
    <circle cx="0" cy="18" r="46" fill="#FBBF24" fill-opacity="0.15" stroke="#FBBF24" stroke-width="2"/>
    <path d="M -12 -28 L 0 -45 L 12 -28 Z" fill="#FBBF24"/>
    <circle cx="0" cy="-22" r="10" fill="#FBBF24"/>
    <path d="M -6 -12 L 6 -12 L 14 16 L -14 16 Z" fill="#38BDF8"/>
    <path d="M 6 -8 Q 24 -20 32 -10" stroke="#FBBF24" stroke-width="3" fill="none"/>
    <circle cx="28" cy="8" r="3" fill="#F43F5E"/>
    <line x1="28" y1="11" x2="28" y2="18" stroke="#22C55E" stroke-width="1.5"/>
    `,
    "ترجمه احمد شاملو • آنچه اصل است از دیده پنهان است"
  ),

  // 4. چنین گفت زرتشت (نیچه) - کوهستان و اخگر خورشید
  "book-4": createSvgBookCover(
    "چنین گفت زرتشت",
    "فریدریش نیچه",
    "فلسفه و اندیشه",
    "#E2E8F0",
    ["#27272A", "#09090B"],
    `
    <circle cx="0" cy="-12" r="28" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="2"/>
    <path d="M -50 42 L 0 -22 L 50 42 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M -20 42 L 15 -2 L 38 42 Z" fill="none" stroke="#A1A1AA" stroke-width="1.5"/>
    <line x1="0" y1="-44" x2="0" y2="-32" stroke="#F59E0B" stroke-width="2"/>
    <line x1="-22" y1="-28" x2="-14" y2="-22" stroke="#F59E0B" stroke-width="2"/>
    <line x1="22" y1="-28" x2="14" y2="-22" stroke="#F59E0B" stroke-width="2"/>
    `,
    "ترجمه داریوش آشوری • کتابی برای همه و هیچ‌کس"
  ),

  // 5. کلیدر (محمود دولت‌آبادی) - خورشید سرخ کویر و اسب کلمیشی
  "book-5": createSvgBookCover(
    "کلیدر",
    "محمود دولت‌آبادی",
    "ادبیات داستانی",
    "#FB7185",
    ["#4C0519", "#1F0208"],
    `
    <circle cx="0" cy="0" r="42" fill="#BE123C" fill-opacity="0.3" stroke="#FB7185" stroke-width="2"/>
    <path d="M -30 25 Q 0 -15 30 25" stroke="#FB7185" stroke-width="2.5" fill="none"/>
    <path d="M -15 25 L 0 -30 L 15 25" stroke="#FB7185" stroke-width="1.5" fill="none"/>
    <circle cx="0" cy="-30" r="5" fill="#FFE4E6"/>
    `,
    "حماسه ده جلدی کویر خراسان • دوره کامل"
  ),

  // 6. جنایت و مکافات (داستایفسکی) - ترازوی وجدان و پترزبورگ
  "book-6": createSvgBookCover(
    "جنایت و مکافات",
    "فئودور داستایفسکی",
    "ادبیات داستانی",
    "#818CF8",
    ["#1E1B4B", "#0B0A1A"],
    `
    <line x1="0" y1="-40" x2="0" y2="40" stroke="#818CF8" stroke-width="2.5"/>
    <line x1="-42" y1="-15" x2="42" y2="-15" stroke="#818CF8" stroke-width="2"/>
    <path d="M -42 -15 L -54 15 L -30 15 Z" fill="#818CF8" fill-opacity="0.25" stroke="#818CF8" stroke-width="1.5"/>
    <path d="M 42 -15 L 30 15 L 54 15 Z" fill="#818CF8" fill-opacity="0.25" stroke="#818CF8" stroke-width="1.5"/>
    <circle cx="0" cy="-42" r="4" fill="#C7D2FE"/>
    `,
    "ترجمه مهری آهی • انتشارات خوارزمی"
  ),

  // 7. انسان در جستجوی معنی (ویکتور فرانکل) - روزنه امید در تاریکی
  "book-7": createSvgBookCover(
    "انسان در جستجوی معنی",
    "ویکتور فرانکل",
    "روانشناسی",
    "#34D399",
    ["#064E3B", "#022C22"],
    `
    <rect x="-40" y="-35" width="80" height="70" fill="none" stroke="#34D399" stroke-width="2"/>
    <line x1="-40" y1="-10" x2="40" y2="-10" stroke="#34D399" stroke-width="1.5"/>
    <line x1="-40" y1="12" x2="40" y2="12" stroke="#34D399" stroke-width="1.5"/>
    <line x1="-15" y1="-35" x2="-15" y2="35" stroke="#34D399" stroke-width="1.5"/>
    <line x1="15" y1="-35" x2="15" y2="35" stroke="#34D399" stroke-width="1.5"/>
    <circle cx="0" cy="-45" r="14" fill="#6EE7B7" fill-opacity="0.8"/>
    `,
    "لوگوتراپی و تجارب آشویتس • انتشارات درسا"
  ),

  // 8. بیگانه (آلبر کامو) - خورشید سوزان الجزایر
  "book-8": createSvgBookCover(
    "بیگانه",
    "آلبر کامو",
    "فلسفه و اندیشه",
    "#F59E0B",
    ["#451A03", "#1C0A00"],
    `
    <circle cx="0" cy="0" r="34" fill="#F59E0B" fill-opacity="0.25" stroke="#F59E0B" stroke-width="3"/>
    <line x1="0" y1="-50" x2="0" y2="-40" stroke="#F59E0B" stroke-width="3"/>
    <line x1="0" y1="40" x2="0" y2="50" stroke="#F59E0B" stroke-width="3"/>
    <line x1="-50" y1="0" x2="-40" y2="0" stroke="#F59E0B" stroke-width="3"/>
    <line x1="40" y1="0" x2="50" y2="0" stroke="#F59E0B" stroke-width="3"/>
    <line x1="-35" y1="-35" x2="-28" y2="-28" stroke="#F59E0B" stroke-width="2"/>
    <line x1="35" y1="35" x2="28" y2="28" stroke="#F59E0B" stroke-width="2"/>
    <line x1="-35" y1="35" x2="-28" y2="28" stroke="#F59E0B" stroke-width="2"/>
    <line x1="35" y1="-35" x2="28" y2="-28" stroke="#F59E0B" stroke-width="2"/>
    `,
    "ترجمه جلال آل‌احمد • مانیفست ابسوردیسم"
  ),

  // 9. صد سال تنهایی (مارکز) - پروانه‌های زرد و ماکوندو
  "book-9": createSvgBookCover(
    "صد سال تنهایی",
    "گابریل گارسیا مارکز",
    "ادبیات داستانی",
    "#EAB308",
    ["#14532D", "#052E16"],
    `
    <path d="M 0 0 C -25 -35 -45 -10 -25 10 C -5 25 0 0 0 0 Z" fill="#EAB308" fill-opacity="0.8"/>
    <path d="M 0 0 C 25 -35 45 -10 25 10 C 5 25 0 0 0 0 Z" fill="#EAB308" fill-opacity="0.8"/>
    <path d="M 0 0 C -20 20 -35 35 -15 45 C 0 35 0 0 0 0 Z" fill="#CA8A04" fill-opacity="0.6"/>
    <path d="M 0 0 C 20 20 35 35 15 45 C 0 35 0 0 0 0 Z" fill="#CA8A04" fill-opacity="0.6"/>
    <circle cx="0" cy="-6" r="3" fill="#FFFFFF"/>
    `,
    "ترجمه بهمن فرزانه • برنده جایزه نوبل ادبیات"
  ),

  // 10. هنر شفاف اندیشیدن (رولف دوبلی) - لامپ تفکر نقاد
  "book-10": createSvgBookCover(
    "هنر شفاف اندیشیدن",
    "رولف دوبلی",
    "روانشناسی",
    "#F87171",
    ["#7F1D1D", "#3B0707"],
    `
    <path d="M -22 -15 C -30 -35 30 -35 22 -15 C 16 0 12 12 12 22 L -12 22 C -12 12 -16 0 -22 -15 Z" fill="none" stroke="#F87171" stroke-width="2.5"/>
    <line x1="-8" y1="28" x2="8" y2="28" stroke="#F87171" stroke-width="2.5"/>
    <line x1="-5" y1="34" x2="5" y2="34" stroke="#F87171" stroke-width="2.5"/>
    <circle cx="0" cy="-14" r="8" fill="#FCA5A5" fill-opacity="0.4"/>
    `,
    "ترجمه عادل فردوسی‌پور • نشر چشمه"
  ),

  // 11. جهان هولوگرافیک (مایکل تالبوت) - امواج تداخل کوانتومی
  "book-11": createSvgBookCover(
    "جهان هولوگرافیک",
    "مایکل تالبوت",
    "علم و تکنولوژی",
    "#38BDF8",
    ["#0C4A6E", "#042F2E"],
    `
    <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="#38BDF8" stroke-width="2" transform="rotate(-25)"/>
    <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="#38BDF8" stroke-width="2" transform="rotate(25)"/>
    <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="#38BDF8" stroke-width="2" transform="rotate(90)"/>
    <circle cx="0" cy="0" r="7" fill="#BAE6FD"/>
    `,
    "ترجمه داریوش مهرجویی • انتشارات هرمس"
  ),

  // 12. فیلم به مثابه فلسفه (نوئل کارول) - نگاتیو سینما
  "book-12": createSvgBookCover(
    "فیلم به مثابه فلسفه",
    "نوئل کارول",
    "هنر و سینما",
    "#E2E8F0",
    ["#18181B", "#09090B"],
    `
    <rect x="-42" y="-30" width="84" height="60" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <rect x="-36" y="-24" width="72" height="48" fill="#FFFFFF" fill-opacity="0.1"/>
    <circle cx="-30" cy="-35" r="3" fill="#FFFFFF"/>
    <circle cx="-10" cy="-35" r="3" fill="#FFFFFF"/>
    <circle cx="10" cy="-35" r="3" fill="#FFFFFF"/>
    <circle cx="30" cy="-35" r="3" fill="#FFFFFF"/>
    <circle cx="-30" cy="35" r="3" fill="#FFFFFF"/>
    <circle cx="-10" cy="35" r="3" fill="#FFFFFF"/>
    <circle cx="10" cy="35" r="3" fill="#FFFFFF"/>
    <circle cx="30" cy="35" r="3" fill="#FFFFFF"/>
    `,
    "ترجمه صالح نجفی • نشر مرکز"
  ),

  // 13. تاریخ بیهقی (ابوالفضل بیهقی) - دار حسنک و کتیبه غزنوی
  "book-13": createSvgBookCover(
    "تاریخ بیهقی",
    "ابوالفضل بیهقی",
    "تاریخ و فرهنگ",
    "#CA8A04",
    ["#422006", "#1E0E02"],
    `
    <rect x="-40" y="-40" width="80" height="80" fill="none" stroke="#CA8A04" stroke-width="1.8" transform="rotate(45)"/>
    <circle cx="0" cy="0" r="28" fill="#CA8A04" fill-opacity="0.2" stroke="#CA8A04" stroke-width="1.5"/>
    <text x="0" y="6" font-family="Kalameh, sans-serif" font-size="16" font-weight="900" fill="#FEF08A" text-anchor="middle">حق</text>
    `,
    "تصحیح دکتر فیاض • قله نثر فاخر فارسی"
  ),

  // 14. سمفونی مردگان (عباس معروفی) - ساعت آقای درستکار و برف
  "book-14": createSvgBookCover(
    "سمفونی مردگان",
    "عباس معروفی",
    "ادبیات داستانی",
    "#94A3B8",
    ["#1E293B", "#0A0E17"],
    `
    <circle cx="0" cy="-10" r="32" fill="none" stroke="#94A3B8" stroke-width="2.5"/>
    <line x1="0" y1="-10" x2="0" y2="-28" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="0" y1="-10" x2="14" y2="-10" stroke="#FFFFFF" stroke-width="2"/>
    <line x1="0" y1="22" x2="0" y2="45" stroke="#94A3B8" stroke-width="1.5"/>
    <circle cx="0" cy="48" r="6" fill="#CBD5E1"/>
    `,
    "تراژدی چهار موومان • انتشارات ققنوس"
  ),
};

