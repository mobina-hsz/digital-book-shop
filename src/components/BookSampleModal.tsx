"use client";

import React from "react";
import { Book } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Type,
  Bookmark,
  Share2,
  Sparkles,
} from "lucide-react";

interface BookSampleModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkPurchased?: (bookId: string) => void;
}

export function BookSampleModal({
  book,
  isOpen,
  onClose,
  onMarkPurchased,
}: BookSampleModalProps) {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [fontSizeClass, setFontSizeClass] = React.useState<"text-base" | "text-lg" | "text-xl">("text-base");

  // Reset page index when opening a new book
  React.useEffect(() => {
    setCurrentPageIndex(0);
  }, [book?.id]);

  if (!book) return null;

  const totalPages = book.sampleExcerpt.pages.length;
  const currentPage = book.sampleExcerpt.pages[currentPageIndex] || {
    pageNumber: 1,
    content: "متن نمونه‌ای برای این اثر ثبت نشده است.",
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const toggleFontSize = () => {
    if (fontSizeClass === "text-base") setFontSizeClass("text-lg");
    else if (fontSizeClass === "text-lg") setFontSizeClass("text-xl");
    else setFontSizeClass("text-base");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-[92vw] sm:w-full border-2 border-foreground bg-[#FDFCF7] dark:bg-[#121212] p-0 overflow-hidden shadow-2xl">
        {/* Editorial Top Status */}
        <div className="border-b border-foreground/20 bg-muted/40 px-6 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="uppercase tracking-widest font-bold">
              [پیش‌نمایش نمونه کتاب // گزیده ویژه آقا منصور]
            </span>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            صفحه {currentPageIndex + 1} از {totalPages}
          </Badge>
        </div>

        {/* Header with Title and Metadata */}
        <div className="px-6 pt-5 pb-3 border-b border-border/50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                {book.category} • سال انتشار: {book.year}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground leading-tight">
                {book.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5 font-sans">
                نویسنده: <span className="text-foreground font-medium">{book.author}</span>
                {book.translator && (
                  <span className="mr-3">
                    | مترجم: <span className="text-foreground font-medium">{book.translator}</span>
                  </span>
                )}
              </p>
            </div>

            {/* Reading Preference Tools */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFontSize}
                className="h-8 px-2 text-xs border border-border/60 hover:border-foreground"
                title="تغییر اندازه قلم"
              >
                <Type className="w-3.5 h-3.5 ml-1" />
                اندازه قلم
              </Button>
            </div>
          </div>

          <div className="mt-3 py-1.5 px-3 bg-muted/30 border-r-2 border-foreground text-[11px] font-mono text-muted-foreground">
            {book.sampleExcerpt.chapterTitle}
          </div>
        </div>

        {/* Sample Reading Paper Body */}
        <div className="px-6 py-6 sm:py-8 min-h-[260px] max-h-[50vh] overflow-y-auto bg-amber-50/20 dark:bg-zinc-950/40 select-text">
          <div className={`font-serif leading-loose text-foreground/90 transition-all duration-200 text-justify ${fontSizeClass}`}>
            <span className="text-3xl sm:text-4xl font-bold float-right ml-3 font-serif text-foreground/40 leading-none">
              «
            </span>
            {currentPage.content}
          </div>

          {book.quote && (
            <div className="mt-6 pt-4 border-t border-dashed border-border/60 text-xs font-serif italic text-muted-foreground/90">
              جمله ماندگار اثر: {book.quote}
            </div>
          )}
        </div>

        {/* Bottom Pagination & Buy Actions */}
        <div className="border-t border-foreground/20 bg-background px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Pagination Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="font-mono text-xs gap-1 border-foreground/30 hover:border-foreground"
            >
              <ChevronRight className="w-4 h-4" />
              صفحه قبل
            </Button>

            <span className="font-mono text-xs text-muted-foreground px-2">
              {currentPageIndex + 1} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="font-mono text-xs gap-1 border-foreground/30 hover:border-foreground"
            >
              صفحه بعد
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Direct Buy / Purchase Action */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="font-mono text-xs font-bold text-foreground">
              {new Intl.NumberFormat("fa-IR").format(book.price)} تومان
            </span>

            <Button
              variant={book.isPurchased ? "secondary" : "default"}
              size="sm"
              onClick={() => {
                if (onMarkPurchased) {
                  onMarkPurchased(book.id);
                }
              }}
              className={`font-mono text-xs transition-all ${
                book.isPurchased
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-foreground text-background"
              }`}
            >
              {book.isPurchased ? "خریده شد ✓" : "خرید کتاب"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

