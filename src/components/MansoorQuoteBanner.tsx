import React from "react";
import { Quote, Sparkles, Compass, ShieldCheck } from "lucide-react";

export function MansoorQuoteBanner() {
  return (
    <section
      id="mansoor-quote"
      className="border-y border-foreground/15 bg-muted/20 py-12 sm:py-16 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        <div className="relative border border-foreground/20 bg-background p-6 sm:p-10 shadow-sm">
          {/* Top Label */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                [بیانیه آقا منصور // صورت‌جلسه شرکت عقب‌گستر]
              </span>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              دفتر مرکزی جدید • پاییز ۱۴۰۳
            </div>
          </div>

          {/* Quote Body */}
          <div className="relative">
            <Quote className="absolute -top-3 -right-2 w-10 h-10 text-foreground/10 -scale-x-100 pointer-events-none" />
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground font-normal tracking-wide text-justify sm:text-right pr-4">
              «من فقط می‌خوام کتاب‌ها رو یه جا ببینم و بفهمم کدومشون ارزش
              خوندن دارن. خودم بلدم نسخه الکترونیکیشون رو از کجا پیدا کنم.
              لازم نیست فروشگاه کتاب یا کتابخوان آنلاین برام بسازید!»
            </blockquote>
          </div>

          {/* Footer & Persona */}
          <div className="mt-8 pt-4 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-foreground flex items-center justify-center font-mono font-bold text-sm bg-foreground text-background">
                م
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-foreground">
                  آقا منصور برگشته
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  کتاب‌خوان باسابقه و بنیان‌گذار سلیقه شرکت
                </p>
              </div>
            </div>

            {/* Principles Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-2.5 py-1 border border-foreground/20 bg-muted/30">
                ✓ ویترین مینیمال مستطیلی
              </span>
              <span className="px-2.5 py-1 border border-foreground/20 bg-muted/30">
                ✓ مرزهای هوشمند هاور
              </span>
              <span className="px-2.5 py-1 border border-foreground/20 bg-muted/30">
                ✓ پیش‌نمایش پاپ‌آپ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

