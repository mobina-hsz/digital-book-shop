"use client";

import React from "react";
import { Book, SortOption } from "@/types/book";
import { INITIAL_BOOKS } from "@/data/booksData";
import { searchOpenLibrary } from "@/services/openLibrary";
import { Navbar } from "@/components/Navbar";
import { MansoorQuoteBanner } from "@/components/MansoorQuoteBanner";
import { FilterBar } from "@/components/FilterBar";
import { BookCard } from "@/components/BookCard";
import { BookDetailsModal } from "@/components/BookDetailsModal";
import { BookSampleModal } from "@/components/BookSampleModal";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { BookOpen, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

export default function HomePage() {
  const [books, setBooks] = React.useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("همه");
  const [selectedSort, setSelectedSort] = React.useState<SortOption>("popular");
  const [isPurchasedOnly, setIsPurchasedOnly] = React.useState<boolean>(false);
  const [isSearchingRemote, setIsSearchingRemote] = React.useState<boolean>(false);

  // Modals state
  const [selectedBookForDetails, setSelectedBookForDetails] = React.useState<Book | null>(null);
  const [selectedBookForSample, setSelectedBookForSample] = React.useState<Book | null>(null);

  // Purchased books state (persisted in localStorage if available)
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

  // Save purchased state
  const savePurchasedIds = (ids: Set<string>) => {
    setPurchasedBookIds(new Set(ids));
    try {
      localStorage.setItem("mansoor_purchased_books", JSON.stringify(Array.from(ids)));
    } catch {
      // ignore
    }
  };

  // Toggle purchased state
  const handleMarkPurchased = (bookId: string) => {
    const updated = new Set(purchasedBookIds);
    const book = books.find((b) => b.id === bookId);
    const isNowPurchased = !updated.has(bookId);

    if (isNowPurchased) {
      updated.add(bookId);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
      toast.success("کتاب خریداری شد ✓", {
        description: `کتاب «${book?.title || "انتخابی"}» با موفقیت به قفسه کتاب‌های شما اضافه شد.`,
      });
    } else {
      updated.delete(bookId);
      toast.info("وضعیت خرید لغو شد", {
        description: `کتاب «${book?.title || "انتخابی"}» از لیست کتاب‌های خریده‌شده حذف شد.`,
      });
    }

    savePurchasedIds(updated);

    // Update state in active modals if open
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

  // Handle Search Debounce with Open Library Integration
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

  // Merge purchased flag into current list of books
  const booksWithPurchased = React.useMemo(() => {
    return books.map((b) => ({
      ...b,
      isPurchased: purchasedBookIds.has(b.id),
    }));
  }, [books, purchasedBookIds]);

  // Filter and Sort books
  const filteredAndSortedBooks = React.useMemo(() => {
    let list = [...booksWithPurchased];

    // Filter by category
    if (selectedCategory !== "همه") {
      list = list.filter((b) => b.category === selectedCategory);
    }

    // Filter by purchased only
    if (isPurchasedOnly) {
      list = list.filter((b) => b.isPurchased);
    }

    // Sort
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
    setSearchQuery("");
    setSelectedCategory("همه");
    setSelectedSort("popular");
    setIsPurchasedOnly(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      {/* Top Navbar */}
      <Navbar
        purchasedCount={purchasedBookIds.size}
        totalBooksCount={booksWithPurchased.length}
        onFilterPurchased={() => setIsPurchasedOnly(!isPurchasedOnly)}
        isPurchasedFilterActive={isPurchasedOnly}
      />

      <main className="flex-1">
        {/* Editorial A24 Hero Section */}
        <section className="border-b border-foreground/15 bg-background pt-12 pb-10 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                <Badge variant="a24" className="text-[10px]">
                  [DIRECTORY // 2026]
                </Badge>
                <span>پروژه ویترین آنلاین • سلیقه آقا منصور</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-foreground leading-[1.15]">
                ویترین و دایرکتوری کشف کتاب‌های الکترونیک
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl font-sans leading-relaxed">
                مجموعه‌ای دست‌چین از برجسته‌ترین آثار ادبی، فلسفی، روان‌شناسی و تاریخی جهان با طراحی اختصاصی، اطلاعات تفصیلی، قیمت، امکان نشانه‌گذاری خرید و پاپ‌آپ مطالعه نمونه اثر.
              </p>
            </div>
          </div>
        </section>

        {/* Mansoor's Quote Banner (From prompt) */}
        <MansoorQuoteBanner />

        {/* Vitrine & Catalog Section */}
        <section className="py-10 sm:py-14">
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

            {/* Vitrine Grid */}
            {filteredAndSortedBooks.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
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
              <div className="mt-12 border border-dashed border-foreground/25 p-12 text-center space-y-4 max-w-md mx-auto">
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
                  className="mt-2 font-mono"
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

