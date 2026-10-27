"use client";

import React from "react";
import { Book, SortOption } from "@/types/book";
import { INITIAL_BOOKS } from "@/data/booksData";
import { searchOpenLibrary } from "@/services/openLibrary";
import { Navbar } from "@/components/Navbar";
import { MansoorQuoteBanner } from "@/components/MansoorQuoteBanner";
import { FilterBar } from "@/components/FilterBar";
import { BookCard } from "@/components/BookCard";
import { TactileShelf } from "@/components/TactileShelf";
import { BookDetailsModal } from "@/components/BookDetailsModal";
import { BookSampleModal } from "@/components/BookSampleModal";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/sound";
import {
  BookOpen,
  Sparkles,
  AlertCircle,
  Disc,
  LayoutGrid,
  ArrowDown,
} from "lucide-react";

export default function HomePage() {
  const [books, setBooks] = React.useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("همه");
  const [selectedSort, setSelectedSort] = React.useState<SortOption>("popular");
  const [isPurchasedOnly, setIsPurchasedOnly] = React.useState<boolean>(false);
  const [isSearchingRemote, setIsSearchingRemote] = React.useState<boolean>(false);
  const [viewMode, setViewMode] = React.useState<"grid" | "shelf">("grid");

  // Modals state
  const [selectedBookForDetails, setSelectedBookForDetails] = React.useState<Book | null>(null);
  const [selectedBookForSample, setSelectedBookForSample] = React.useState<Book | null>(null);

  // Purchased books state
  const [purchasedBookIds, setPurchasedBookIds] = React.useState<Set<string>>(new Set());

  // Load purchased state on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("mansoor_purchased_books");
      if (saved) {
        setPurchasedBookIds(new Set(JSON.parse(saved)));
      }
    } catch {
      // ignore
    }
  }, []);

  const savePurchasedIds = (ids: Set<string>) => {
    setPurchasedBookIds(new Set(ids));
    try {
      localStorage.setItem("mansoor_purchased_books", JSON.stringify(Array.from(ids)));
    } catch {
      // ignore
    }
  };

  const handleMarkPurchased = (bookId: string) => {
    soundManager.playTick();
    const updated = new Set(purchasedBookIds);
    const book = books.find((b) => b.id === bookId);
    const isNowPurchased = !updated.has(bookId);

    if (isNowPurchased) {
      updated.add(bookId);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
      toast.success("کتاب خریداری شد ✓", {
        description: `کتاب «${book?.title || "انتخابی"}» به قفسه شما اضافه شد.`,
      });
    } else {
      updated.delete(bookId);
      toast.info("وضعیت خرید لغو شد", {
        description: `کتاب «${book?.title || "انتخابی"}» از لیست خریده‌شده‌ها خارج شد.`,
      });
    }

    savePurchasedIds(updated);

    if (selectedBookForDetails && selectedBookForDetails.id === bookId) {
      setSelectedBookForDetails({
        ...selectedBookForDetails,
        isPurchased: isNowPurchased,
      });
    }
    if (selectedBookForSample && selectedBookForSample.id === bookId) {
      setSelectedBookForSample({
        ...selectedBookForSample,
        isPurchased: isNowPurchased,
      });
    }
  };

  // Search Debounce with Open Library
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setBooks(INITIAL_BOOKS);
      setIsSearchingRemote(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingRemote(true);
      try {
        const results = await searchOpenLibrary(searchQuery);
        setBooks(results);
      } catch {
        setBooks(INITIAL_BOOKS);
      } finally {
        setIsSearchingRemote(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const booksWithPurchased = React.useMemo(() => {
    return books.map((b) => ({
      ...b,
      isPurchased: purchasedBookIds.has(b.id),
    }));
  }, [books, purchasedBookIds]);

  const filteredAndSortedBooks = React.useMemo(() => {
    let list = [...booksWithPurchased];

    if (selectedCategory !== "همه") {
      list = list.filter((b) => b.category === selectedCategory);
    }

    if (isPurchasedOnly) {
      list = list.filter((b) => b.isPurchased);
    }

    list.sort((a, b) => {
      switch (selectedSort) {
        case "popular":
          return b.reviewsCount - a.reviewsCount;
        case "newest":
          return b.year - a.year;
        case "oldest":
          return a.year - b.year;
        case "rating":
          return b.rating - a.rating;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title, "fa");
        default:
          return 0;
      }
    });

    return list;
  }, [booksWithPurchased, selectedCategory, isPurchasedOnly, selectedSort]);

  const handleResetFilters = () => {
    soundManager.playTick();
    setSearchQuery("");
    setSelectedCategory("همه");
    setSelectedSort("popular");
    setIsPurchasedOnly(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      {/* Top A24 Floating Minimal Header */}
      <Navbar
        purchasedCount={purchasedBookIds.size}
        totalBooksCount={booksWithPurchased.length}
        onFilterPurchased={() => setIsPurchasedOnly(!isPurchasedOnly)}
        isPurchasedFilterActive={isPurchasedOnly}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === "grid" ? "shelf" : "grid")}
      />

      <main className="flex-1">
        {/* 
          ====================================================================
          REFERO SPECIFICATION: FULL-BLEED BLACK HERO BAND
          "The first screen is a black band with large titles stacked vertically...
          Section gaps are generous (96px) to let the alternation breathe."
          ====================================================================
        */}
        <section className="bg-[#000000] text-[#FFFFFF] py-16 sm:py-24 border-b border-[#222222]">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#888888] uppercase tracking-widest">
                  <span className="px-2 py-0.5 border border-[#444444] text-white">
                    [A24 ARCHIVE // 2026]
                  </span>
                  <span>سفارش اختصاصی آقا منصور • شرکت عقب‌گستر</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
                    ویترین و کشف کتاب‌های برگزیده
                  </h1>
                  <div className="flex items-baseline gap-3 pt-2">
                    <span className="font-mono text-sm sm:text-base text-[#888888] tracking-widest uppercase">
                      [ELECTRONIC ARCHIVE CATALOGUE]
                    </span>
                    <span className="font-mono text-xs text-[#666666]">
                      • {books.length} اثر نمایه‌شده
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#AAAAAA] max-w-2xl font-sans leading-relaxed pt-2">
                  سامانه بروتالیست کشف آثار ادبی، فلسفی، روان‌شناسی و تاریخی بدون نیاز به دیتابیس؛
                  طراحی‌شده دقیقاً بر پایه سلیقه سخت‌گیرانه آقا منصور با خطوط های‌لایت در هاور و پاپ‌آپ نمونه اثر.
                </p>
              </div>

              {/* View Switcher & Quick Stats */}
              <div className="lg:col-span-4 flex flex-col justify-end gap-4 border-t lg:border-t-0 lg:border-r border-[#222222] pt-6 lg:pt-0 lg:pr-8">
                <div className="space-y-1 font-mono text-xs text-[#888888]">
                  <div>[وضعیت قفسه شخصی]: {purchasedBookIds.size} کتاب خریده‌شده</div>
                  <div>[مرجع ثانویه]: پایگاه جهانی Open Library</div>
                  <div>[دیزاین سیستم]: A24 Films & Ravi Klaassens</div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant={viewMode === "shelf" ? "a24Solid" : "a24"}
                    size="sm"
                    onClick={() => {
                      soundManager.playTick();
                      setViewMode("shelf");
                    }}
                    className="flex-1 font-mono text-xs border-[#444444] text-white hover:bg-white hover:text-black rounded-none h-10"
                  >
                    <Disc className="w-3.5 h-3.5 ml-1.5" />
                    قفسه فیزیکی A24
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "a24Solid" : "a24"}
                    size="sm"
                    onClick={() => {
                      soundManager.playTick();
                      setViewMode("grid");
                    }}
                    className="flex-1 font-mono text-xs border-[#444444] text-white hover:bg-white hover:text-black rounded-none h-10"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 ml-1.5" />
                    گرید ادیتوریال
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          ====================================================================
          RAVI KLAASSENS TACTILE SHELF SECTION (When active or featured)
          ====================================================================
        */}
        {viewMode === "shelf" && (
          <section className="bg-[#0A0A0A] border-b border-[#222222] py-8">
            <div className="container mx-auto px-4 sm:px-8">
              <TactileShelf
                books={filteredAndSortedBooks}
                onOpenDetails={(b) => setSelectedBookForDetails(b)}
                onOpenSample={(b) => setSelectedBookForSample(b)}
                onMarkPurchased={handleMarkPurchased}
              />
            </div>
          </section>
        )}

        {/* Mansoor's Quote Banner (Contrast Band) */}
        <MansoorQuoteBanner />

        {/* 
          ====================================================================
          LIGHT / PAPER SECTION: CATALOGUE & EDITORIAL GRID
          ====================================================================
        */}
        <section className="py-12 sm:py-20 bg-background text-foreground">
          <div className="container mx-auto px-4 sm:px-8">
            {/* Filter and Search Controls */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              isPurchasedOnly={isPurchasedOnly}
              onTogglePurchasedOnly={() => setIsPurchasedOnly(!isPurchasedOnly)}
              totalResults={filteredAndSortedBooks.length}
              onResetFilters={handleResetFilters}
              isSearchingRemote={isSearchingRemote}
            />

            {/* Vitrine Grid (The Rectangular Books Showcase with Hover Lines) */}
            {filteredAndSortedBooks.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
                {filteredAndSortedBooks.map((book, index) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    index={index}
                    onOpenDetails={(b) => setSelectedBookForDetails(b)}
                    onOpenSample={(b) => setSelectedBookForSample(b)}
                    onMarkPurchased={handleMarkPurchased}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="mt-16 border-2 border-dashed border-foreground/30 p-12 text-center space-y-4 max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto" />
                <h3 className="font-serif text-lg font-bold">
                  اثری با معیارهای انتخابی یافت نشد
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  می‌توانید عبارت جستجو را تغییر دهید یا فیلترهای دسته و خرید را بازنشانی کنید.
                </p>
                <Button
                  variant="a24"
                  size="sm"
                  onClick={handleResetFilters}
                  className="mt-2 font-mono rounded-none"
                >
                  بازنشانی فیلترها
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBookForDetails}
        isOpen={Boolean(selectedBookForDetails)}
        onClose={() => setSelectedBookForDetails(null)}
        onOpenSample={(b) => setSelectedBookForSample(b)}
        onMarkPurchased={handleMarkPurchased}
      />

      {/* Book Sample Pop-up Modal */}
      <BookSampleModal
        book={selectedBookForSample}
        isOpen={Boolean(selectedBookForSample)}
        onClose={() => setSelectedBookForSample(null)}
        onMarkPurchased={handleMarkPurchased}
      />
    </div>
  );
}
