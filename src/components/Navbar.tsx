"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BookmarkCheck, CreditCard, Menu, X, LayoutGrid, Disc } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { soundManager } from "@/lib/sound";

interface NavbarProps {
  purchasedCount?: number;
  totalBooksCount?: number;
  onFilterPurchased?: () => void;
  isPurchasedFilterActive?: boolean;
  viewMode?: "grid" | "shelf";
  onToggleViewMode?: () => void;
}

export function Navbar({
  purchasedCount = 0,
  totalBooksCount = 14,
  onFilterPurchased,
  isPurchasedFilterActive = false,
  viewMode = "grid",
  onToggleViewMode,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/20 bg-background/95 backdrop-blur-md transition-colors">
      {/* Top Editorial Ticker Bar (Refero & A24 spec) */}
      <div className="border-b border-foreground/15 bg-black text-white px-4 py-1.5 text-[10px] sm:text-[11px] font-mono flex justify-between items-center tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-emerald-400 animate-pulse" />
          <span>پروژه شماره ۱ • شرکت عقب‌گستر • دفتر مرکزی</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <span>آرشیو کشف کتاب آقا منصور</span>
          <span className="text-[#888888]">[CATALOGUE 2026 // A24 SYSTEM]</span>
        </div>
      </div>

      {/* Main Bar: Hamburger / Nav Links Left, Wordmark Center, Shelf / Actions Right */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Left: Nav Links */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase">
            <Link
              href="/"
              onClick={() => soundManager.playTick()}
              className={`transition-colors hover:text-foreground relative py-1 ${
                pathname === "/"
                  ? "text-foreground font-bold border-b-2 border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              ویترین کتاب‌ها
            </Link>
            <Link
              href="/subscriptions"
              onClick={() => soundManager.playTick()}
              className={`transition-colors hover:text-foreground relative py-1 flex items-center gap-1.5 ${
                pathname === "/subscriptions"
                  ? "text-foreground font-bold border-b-2 border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              طرح‌های اشتراک
            </Link>
            <a
              href="#mansoor-quote"
              onClick={() => soundManager.playTick()}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              دیدگاه منصور
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundManager.playTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-foreground focus:outline-none"
            aria-label="منو"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center: A24 Wordmark */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-2">
          <Link
            href="/"
            onClick={() => soundManager.playTick()}
            className="group flex items-baseline gap-2 text-foreground transition-opacity hover:opacity-80"
          >
            <span className="font-mono text-2xl sm:text-3xl font-black tracking-tighter uppercase border-b-2 border-foreground">
              A24
            </span>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-normal text-foreground/90">
              / کتابخانه منصور
            </span>
          </Link>
        </div>

        {/* Right: Actions, View Mode Toggle & Purchased Books */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Crate/Grid Toggle on Homepage */}
          {pathname === "/" && onToggleViewMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                soundManager.playTick();
                onToggleViewMode();
              }}
              className="hidden lg:flex items-center gap-1.5 font-mono text-xs border-foreground/30 hover:border-foreground rounded-none h-9 px-3"
              title="تغییر حالت نمایش ویترین"
            >
              {viewMode === "grid" ? (
                <>
                  <Disc className="w-3.5 h-3.5" />
                  <span>قفسه گردان فیزیکی A24</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>گرید ادیتوریال</span>
                </>
              )}
            </Button>
          )}

          {/* Purchased Books Filter Button */}
          {pathname === "/" && onFilterPurchased && (
            <Button
              variant={isPurchasedFilterActive ? "a24Solid" : "a24"}
              size="sm"
              onClick={() => {
                soundManager.playTick();
                onFilterPurchased();
              }}
              className="gap-2 relative rounded-none h-9 px-3"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">کتاب‌های من</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded font-mono text-[10px]">
                {purchasedCount}
              </span>
            </Button>
          )}

          <Link href="/subscriptions" className="hidden sm:inline-flex">
            <Button variant="default" size="sm" className="font-mono text-xs rounded-none h-9 px-4">
              عضویت منصورخوان
            </Button>
          </Link>
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
            طرح‌های اشتراک (AAA24 Membership)
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
