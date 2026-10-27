import React from "react";
import { Quote } from "lucide-react";

export function MansoorQuoteBanner() {
  return (
    <section
      id="mansoor-quote"
      className="border-y border-[#333333] bg-[#000000] text-[#FFFFFF] py-14 sm:py-20 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        <div className="relative border border-[#333333] bg-[#0A0A0A] p-6 sm:p-12 shadow-2xl">
          {/* Top Label */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#222222] pb-4 mb-8 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-none" />
              <span className="uppercase tracking-widest text-[#AAAAAA] font-bold">
                [بیانیه رسمی آقا منصور // مانیفست شرکت عقب‌گستر]
              </span>
            </div>
            <div className="text-[#666666]">
              ثبت‌شده در نخستین جلسه دفتر جدید • پاییز ۱۴۰۳
            </div>
          </div>

          {/* Quote Body */}
          <div className="relative">
            <Quote className="absolute -top-4 -right-3 w-12 h-12 text-white/10 -scale-x-100 pointer-events-none" />
            <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl leading-relaxed text-white font-normal tracking-wide text-justify sm:text-right pr-6">
              «من فقط می‌خوام کتاب‌ها رو یه جا ببینم و بفهمم کدومشون ارزش
              خوندن دارن. خودم بلدم نسخه الکترونیکیشون رو از کجا پیدا کنم.
              لازم نیست فروشگاه کتاب یا کتابخوان آنلاین برام بسازید!»
            </blockquote>
          </div>

          {/* Footer & Persona */}
          <div className="mt-10 pt-5 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white flex items-center justify-center font-mono font-bold text-sm bg-white text-black">
                م
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-white">
                  آقا منصور برگشته
                </p>
                <p className="font-mono text-xs text-[#888888]">
                  کتاب‌خوان باسابقه و طراح معیار سلیقه شرکت
                </p>
              </div>
            </div>

            {/* Principles Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-3 py-1 border border-[#333333] bg-black text-[#CCCCCC]">
                ✓ فرم مستطیلی واقعی کتاب
              </span>
              <span className="px-3 py-1 border border-[#333333] bg-black text-[#CCCCCC]">
                ✓ خطوط کادر و کراس‌هیر در هاور
              </span>
              <span className="px-3 py-1 border border-[#333333] bg-black text-[#CCCCCC]">
                ✓ پاپ‌آپ پیش‌نمایش گزیده اثر
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
