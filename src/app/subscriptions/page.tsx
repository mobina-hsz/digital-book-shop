"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight, ArrowLeft, Star, HelpCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface Tier {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  yearlyPriceMonthly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

const TIERS: Tier[] = [
  {
    id: "free",
    code: "SUB-01",
    name: "عضویت منصورخوان",
    subtitle: "پلن پایه و رایگان برای عموم کتاب‌دوستان",
    monthlyPrice: 0,
    yearlyPriceMonthly: 0,
    description: "برای مطالعه و گشت‌وگذار در ویترین و ارزیابی نمونه کتاب‌ها بدون نیاز به ثبت‌نام سنگین.",
    features: [
      "دسترسی کامل به ویترین مستطیلی کتاب‌ها",
      "قابلیت پیش‌نمایش پاپ‌آپ نمونه گزیده اثر",
      "جستجوی هم‌زمان در پایگاه Open Library",
      "فیلتر بر اساس دسته و مرتب‌سازی دقیق",
      "نشانه‌گذاری کتاب‌های خریده‌شده",
    ],
    ctaText: "پلن فعال شما",
  },
  {
    id: "pro",
    code: "SUB-02",
    name: "حلقه اهل قلم",
    subtitle: "طرح برگزیده الهام‌گرفته از AAA24",
    monthlyPrice: 95000,
    yearlyPriceMonthly: 75000,
    description: "برای عاشقان جدی کتاب که می‌خواهند از نقدها، مقالات و شناسنامه‌های تفصیلی بهره‌مند شوند.",
    features: [
      "تمامی امکانات پلن منصورخوان",
      "دانلود شناسنامه کامل و کاتالوگ چاپی کتاب به سبک A24",
      "پیشنهادهای هوشمند هفتگی منطبق با سلیقه آقا منصور",
      "یادداشت‌های اختصاصی تحلیل فرم و زمینه تاریخی اثر",
      "دسترسی زودهنگام به کتاب‌های افزوده شده به آرشیو",
      "نشان اختصاصی اهل قلم در حساب کاربری",
    ],
    isPopular: true,
    ctaText: "ارتقا به حلقه اهل قلم",
  },
  {
    id: "vip",
    code: "SUB-03",
    name: "آرشیو طلایی عقب‌گستر",
    subtitle: "عضویت ویژه با هدایای فیزیکی و آرشیو کامل",
    monthlyPrice: 195000,
    yearlyPriceMonthly: 155000,
    description: "بالاترین سطح اشتراک؛ دسترسی بی‌حدومرز به تمام نسخه‌ها، بسته‌های فصلی و خدمات VIP دفتر مرکزی.",
    features: [
      "تمامی امکانات حلقه اهل قلم",
      "پیش‌نمایش نامحدود کل فصل‌های آغازین تمامی کتب",
      "ارسال فصلی بسته فیزیکی پوسترها و نشانک‌های اختصاصی A24",
      "دسترسی به بخش نسخ نایاب و نُسخ خطی بازخوانی‌شده",
      "پشتیبانی مستقیم و تماس هفتگی با اتاق طراحی عقب‌گستر",
    ],
    ctaText: "عضویت در آرشیو طلایی",
  },
];

const FAQS = [
  {
    q: "آیا این اشتراک شامل خرید نسخه چاپی کتاب‌ها می‌شود؟",
    a: "خیر؛ همان‌طور که آقا منصور فرمودند: «من فقط می‌خوام کتاب‌ها رو یه جا ببینم و بفهمم کدومشون ارزش خوندن دارن. خودم بلدم نسخه الکترونیکیشون رو از کجا پیدا کنم!» این اشتراک جهت دسترسی به گزیده‌ها، نقدها، شناسنامه‌ها و ویترین تحلیلی است.",
  },
  {
    q: "تفاوت اشتراک سالانه و ماهانه چیست؟",
    a: "با انتخاب پرداخت سالانه، از ۲۵٪ تخفیف بهره‌مند می‌شوید و اشتراک شما به مدت ۱۲ ماه بدون تغییر قیمت فعال خواهد بود.",
  },
  {
    q: "چگونه می‌توانم اشتراک خود را لغو کنم؟",
    a: "این سامانه بدون نیاز به دیتابیس یا قراردادهای اجباری پیاده‌سازی شده است. هر زمان می‌توانید با یک کلیک وضعیت اشتراک خود را تغییر دهید.",
  },
];

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly");
  const [activePlanId, setActivePlanId] = React.useState<string>("free");

  const handleSelectPlan = (tier: Tier) => {
    setActivePlanId(tier.id);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    toast.success(`طرح اشتراک «${tier.name}» با موفقیت فعال شد!`, {
      description: `نوع پرداخت: ${billingCycle === "yearly" ? "سالانه (با ۲۵٪ تخفیف)" : "ماهانه"}. به خانواده عقب‌گستر خوش آمدید!`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
          {/* Breadcrumb & Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              بازگشت به ویترین اصلی کتاب‌ها
            </Link>
          </div>

          {/* Editorial Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <Badge variant="a24" className="font-mono text-xs px-3 py-1">
              [طرح‌های اشتراک و عضویت کتابخانه // AAA24 MEMBERSHIP]
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
              حق عضویت در تالار انتخاب کتاب آقا منصور
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              ساده، شفاف و بدون دیتابیس پیچیده؛ سطحی را انتخاب کنید که متناسب با عطش مطالعه و کنجکاوی ادبی شما باشد.
            </p>

            {/* Billing Toggle (Monthly / Yearly) */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span
                className={`font-mono text-xs cursor-pointer ${
                  billingCycle === "monthly" ? "text-foreground font-bold" : "text-muted-foreground"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                پرداخت ماهانه
              </span>

              <button
                type="button"
                onClick={() =>
                  setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
                }
                className="w-12 h-6 border border-foreground bg-muted p-0.5 flex items-center transition-colors relative"
              >
                <div
                  className={`w-4 h-4 bg-foreground transition-transform duration-200 ${
                    billingCycle === "yearly" ? "translate-x-0" : "-translate-x-6"
                  }`}
                />
              </button>

              <div className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-xs cursor-pointer ${
                    billingCycle === "yearly" ? "text-foreground font-bold" : "text-muted-foreground"
                  }`}
                  onClick={() => setBillingCycle("yearly")}
                >
                  پرداخت سالانه
                </span>
                <span className="bg-foreground text-background text-[10px] font-mono px-2 py-0.5 font-bold">
                  ۲۵٪ تخفیف
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-20">
            {TIERS.map((tier) => {
              const isSelected = activePlanId === tier.id;
              const displayPrice =
                billingCycle === "yearly" ? tier.yearlyPriceMonthly : tier.monthlyPrice;

              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col justify-between border-2 p-6 sm:p-8 transition-all duration-300 bg-background ${
                    tier.isPopular
                      ? "border-foreground shadow-2xl scale-[1.02] z-10"
                      : "border-foreground/30 hover:border-foreground shadow-sm"
                  }`}
                >
                  {/* Popular Tag */}
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background font-mono text-[10px] uppercase font-bold px-3 py-0.5 tracking-widest">
                      [محبوب‌ترین میان اهل ادب]
                    </div>
                  )}

                  {/* Top Tier Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-foreground/15 pb-3">
                      <span className="font-mono text-xs text-muted-foreground tracking-widest">
                        [{tier.code}]
                      </span>
                      {isSelected && (
                        <Badge variant="success" className="font-mono text-[10px]">
                          طرح فعال شما
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {tier.name}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price Box */}
                    <div className="py-4 border-y border-dashed border-border/80">
                      {tier.monthlyPrice === 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-3xl font-black text-foreground">
                            رایگان
                          </span>
                          <span className="font-sans text-xs text-muted-foreground">
                            / برای همیشه
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono text-3xl font-black text-foreground">
                              {new Intl.NumberFormat("fa-IR").format(displayPrice)}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              تومان / ماه
                            </span>
                          </div>
                          {billingCycle === "yearly" && (
                            <div className="font-mono text-[11px] text-muted-foreground mt-1">
                              صورت‌حساب سالانه:{" "}
                              {new Intl.NumberFormat("fa-IR").format(displayPrice * 12)}{" "}
                              تومان
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="font-sans text-xs leading-relaxed text-foreground/80">
                      {tier.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block">
                        امکانات شامل:
                      </span>
                      <ul className="space-y-2">
                        {tier.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs font-sans text-foreground/90 leading-normal"
                          >
                            <Check className="w-3.5 h-3.5 text-foreground shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-8 mt-6 border-t border-foreground/15">
                    <Button
                      type="button"
                      variant={isSelected ? "secondary" : tier.isPopular ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleSelectPlan(tier)}
                      className={`w-full font-mono text-xs ${
                        isSelected
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : tier.isPopular
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "border-foreground hover:bg-foreground hover:text-background"
                      }`}
                    >
                      {isSelected ? "طرح فعلی فعال است ✓" : tier.ctaText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Accordion Section */}
          <div className="border border-foreground/20 p-8 sm:p-12 bg-muted/20">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="font-mono text-xs">
                  [پرسش‌های متداول آقا منصور]
                </Badge>
                <h3 className="font-serif text-2xl font-bold">
                  پاسخ به سوالات پرتکرار درباره اشتراک‌ها
                </h3>
              </div>

              <div className="space-y-4 pt-4 divide-y divide-border/60">
                {FAQS.map((faq, i) => (
                  <div key={i} className="pt-4 first:pt-0 space-y-1.5">
                    <h4 className="font-sans font-bold text-sm text-foreground flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed pr-6 text-justify">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

