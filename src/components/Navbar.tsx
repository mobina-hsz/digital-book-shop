"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BookmarkCheck, Sparkles, CreditCard, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  purchasedCount?: number;
  totalBooksCount?: number;
  onFilterPurchased?: () => void;
  isPurchasedFilterActive?: boolean;
}

export function Navbar({
  purchasedCount = 0,
  totalBooksCount = 14,
  onFilterPurchased,
  isPurchasedFilterActive = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/15 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-colors">
      {/* Top Editorial Ticker Bar */}
      <div className="border-b border-foreground/10 bg-muted/40 px-4 py-1.5 text-[11px] font-mono text-muted-foreground flex justify-between items-center tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>پروژه شماره ۱ • شرکت عقب‌گستر • دفتر مرکزی</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>آرشیو اختصاصی آقا منصور</span>
          <span>[VER 2.4 - A24 EDITORIAL]</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2 text-foreground transition-opacity hover:opacity-80"
          >
            <span className="font-mono text-xl sm:text-2xl font-black tracking-tighter uppercase border-b-2 border-foreground">
              A24
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-normal text-foreground/90">
              / کتابخانه منصور
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          <Link
            href="/"
            className={`transition-colors hover:text-foreground relative py-1 ${
              pathname === "/"
                ? "text-foreground font-bold border-b border-foreground"
                : "text-muted-foreground"
            }`}
          >
            ویترین کتاب‌ها
          </Link>
          <Link
            href="/subscriptions"
            className={`transition-colors hover:text-foreground relative py-1 flex items-center gap-1.5 ${
              pathname === "/subscriptions"
                ? "text-foreground font-bold border-b border-foreground"
                : "text-muted-foreground"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            طرح‌های اشتراک
            <Badge variant="a24" className="text-[9px] px-1 py-0 h-4">
              جدید
            </Badge>
          </Link>
          <a
            href="#mansoor-quote"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            دیدگاه منصور
          </a>
        </nav>

        {/* Right Action: Purchased Books Shelf & Badge */}
        <div className="flex items-center gap-3">
          {pathname === "/" && onFilterPurchased && (
            <Button
              variant={isPurchasedFilterActive ? "a24Solid" : "a24"}
              size="sm"
              onClick={onFilterPurchased}
              className="gap-2 relative group"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>کتاب‌های من</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded font-mono text-[10px]">
                {purchasedCount}
              </span>
            </Button>
          )}

          <Link href="/subscriptions" className="hidden sm:inline-flex">
            <Button variant="default" size="sm" className="font-mono text-xs">
              عضویت منصورخوان
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground focus:outline-none"
            aria-label="منو"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3 font-mono text-xs">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground hover:underline"
          >
            ویترین کتاب‌ها
          </Link>
          <Link
            href="/subscriptions"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-foreground hover:underline"
          >
            طرح‌های اشتراک (صفحه اشتراک‌ها)
          </Link>
          <a
            href="#mansoor-quote"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-muted-foreground hover:text-foreground"
          >
            دیدگاه آقا منصور
          </a>
        </div>
      )}
    </header>
  );
}

