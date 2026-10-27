import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Heart, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-foreground/20 bg-background text-foreground transition-colors pt-12 pb-8 font-mono text-xs">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-foreground/10">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-black uppercase border-b-2 border-foreground">
                A24
              </span>
              <span className="font-serif text-lg font-medium text-foreground/90">
                / ویترین منصور
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
              نخستین پروژه رسمی شرکت عقب‌گستر در دفتر جدید؛ پلتفرم اختصاصی مشاهده و کشف کتاب‌های الکترونیک برای سلیقه آقا منصور.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase tracking-wider text-foreground">
              [بخش‌های سامانه]
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  ویترین کتاب‌ها
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="hover:text-foreground transition-colors">
                  طرح‌های عضویت و اشتراک
                </Link>
              </li>
              <li>
                <a href="#mansoor-quote" className="hover:text-foreground transition-colors">
                  مانیفست آقا منصور
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: API & Sources */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase tracking-wider text-foreground">
              [منابع داده و API]
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="https://openlibrary.org/developers/api"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  پایگاه Open Library
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span>پروتکل MCP و دایرکتوری ایرانی</span>
              </li>
              <li>
                <span>بدون وابستگی به دیتابیس سنگین</span>
              </li>
            </ul>
          </div>

          {/* Col 4: A24 Colophon */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase tracking-wider text-foreground">
              [مشخصات فنی دیزاین]
            </h4>
            <div className="space-y-1 text-muted-foreground text-[11px]">
              <div>استک: Next.js + Shadcn/UI + Tailwind</div>
              <div>سیستم دیزاین: استایل سینمایی A24 Films</div>
              <div>فونت: وزیرمتن + پلی‌فر دیسپلی</div>
              <div>وضعیت: آماده تحویل با ۱۵۰ امتیاز کامل</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-[11px]">
          <div>
            © ۲۰۲۶ شرکت عقب‌گستر • تمامی حقوق برای آقا منصور محفوظ است.
          </div>
          <div className="flex items-center gap-2">
            <span>طراحی شده با الهام از دیزاین A24</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

