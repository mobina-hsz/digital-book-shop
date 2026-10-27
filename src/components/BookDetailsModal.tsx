"use client";

import React from "react";
import Image from "next/image";
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
  Calendar,
  User,
  BookOpen,
  Sparkles,
  Tag,
  Hash,
  Star,
  Check,
  BookmarkCheck,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSample: (book: Book) => void;
  onMarkPurchased: (bookId: string) => void;
}

export function BookDetailsModal({
  book,
  isOpen,
  onClose,
  onOpenSample,
  onMarkPurchased,
}: BookDetailsModalProps) {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[94vw] sm:w-full border-2 border-foreground bg-background p-0 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Top A24 Style Spec Bar */}
        <div className="border-b border-foreground/20 bg-muted/40 px-6 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest uppercase">
              [شناسنامه اثر // آرشیو الکترونیک]
            </span>
          </div>
          <span className="text-muted-foreground">
            شابک: {book.isbn || "ثبت‌شده در دایرکتوری"}
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Book Spine / Cover Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              {/* Realistic Rectangular Book Mock */}
              <div className="relative group w-48 sm:w-56 aspect-[1/1.45] rounded-r-md rounded-l-sm shadow-2xl border border-foreground/20 overflow-hidden bg-muted transition-transform duration-300">
                {/* Book Spine Shadow Left Edge */}
                <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-3 bottom-0 w-[1px] bg-white/20 z-10 pointer-events-none" />

                {/* Cover Image */}
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />

                {/* Floating Purchased Stamp */}
                {book.isPurchased && (
                  <div className="absolute top-3 left-3 z-20 bg-emerald-600 text-white text-[10px] font-mono px-2 py-1 rounded shadow-md flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    خریده شد
                  </div>
                )}
              </div>

              {/* Price & Rating Tag */}
              <div className="mt-5 w-full border border-foreground/15 bg-muted/20 p-3 text-center space-y-1">
                <div className="font-mono text-xs text-muted-foreground uppercase">
                  ارزش‌گذاری نسخه الکترونیک
                </div>
                <div className="font-mono text-xl font-bold text-foreground">
                  {formatPrice(book.price)}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-mono pt-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{book.rating} از ۵</span>
                  <span className="text-muted-foreground">
                    ({book.reviewsCount} ارزیابی)
                  </span>
                </div>
              </div>
            </div>

            {/* Details & Synopsis Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {book.category}
                  </Badge>
                  {book.originalTitle && (
                    <span className="font-mono text-[11px] text-muted-foreground italic">
                      {book.originalTitle}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
                  {book.title}
                </h1>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-sans text-muted-foreground border-y border-border/50 py-3">
                  <div>
                    <span className="font-mono text-[11px] text-foreground/70 block">
                      نویسنده:
                    </span>
                    <span className="font-bold text-foreground">{book.author}</span>
                  </div>
                  {book.translator && (
                    <div>
                      <span className="font-mono text-[11px] text-foreground/70 block">
                        مترجم:
                      </span>
                      <span className="font-bold text-foreground">
                        {book.translator}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-mono text-[11px] text-foreground/70 block">
                      سال انتشار:
                    </span>
                    <span className="font-mono text-foreground">{book.year}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-foreground/70 block">
                      ناشر / مرجع:
                    </span>
                    <span className="text-foreground">{book.publisher}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              {book.quote && (
                <div className="border-r-2 border-foreground pr-3 py-1 font-serif text-sm italic text-foreground/80 bg-muted/10">
                  {book.quote}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  [درباره و چکیده اثر]
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90 font-sans text-justify">
                  {book.description}
                </p>
              </div>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="font-mono text-[10px] text-muted-foreground uppercase block">
                    کلیدواژه‌های موضوعی:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-foreground/15 text-[10px] font-mono bg-muted/20 text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="border-t border-foreground/20 bg-background px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            ویترین کتاب آقا منصور • آماده بررسی و خرید
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sample Pop-up Trigger */}
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                onClose();
                onOpenSample(book);
              }}
              className="flex-1 sm:flex-initial font-mono text-xs gap-1.5 border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              مطالعه نمونه (Pop-up)
            </Button>

            {/* Buy / Purchased Action */}
            <Button
              variant={book.isPurchased ? "secondary" : "default"}
              size="default"
              onClick={() => onMarkPurchased(book.id)}
              className={`flex-1 sm:flex-initial font-mono text-xs gap-1.5 transition-all ${
                book.isPurchased
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-foreground text-background hover:bg-foreground/90"
              }`}
            >
              {book.isPurchased ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  خریده شد ✓
                </>
              ) : (
                <>خرید کتاب ({formatPrice(book.price)})</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

