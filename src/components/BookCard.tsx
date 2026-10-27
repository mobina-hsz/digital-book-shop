"use client";

import React from "react";
import { Book } from "@/types/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  BookOpen,
  Check,
  Star,
  ExternalLink,
  ShoppingBag,
  Eye,
} from "lucide-react";

interface BookCardProps {
  book: Book;
  index: number;
  onOpenDetails: (book: Book) => void;
  onOpenSample: (book: Book) => void;
  onMarkPurchased: (bookId: string) => void;
}

export function BookCard({
  book,
  index,
  onOpenDetails,
  onOpenSample,
  onMarkPurchased,
}: BookCardProps) {
  const indexPadded = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group relative flex flex-col justify-between bg-card text-card-foreground transition-all duration-300 p-3 sm:p-4 cursor-pointer"
      onClick={() => onOpenDetails(book)}
    >
      {/* 
        ======================================================================
        CRITICAL HOVER BORDER EFFECT (A24 Registration Outline System):
        "اون خط های دورش رو وقتی موس بیاد نمایش داده بشه حتما"
        Hidden by default (opacity-0), crisp 1.5px solid border appears on hover (opacity-100)
        ======================================================================
      */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-30">
        {/* Full Framing Perimeter Lines */}
        <div className="absolute inset-0 border border-foreground/90 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]" />

        {/* A24 Editorial Corner Crosshairs */}
        <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-foreground leading-none font-bold">
          +
        </span>
        <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-foreground leading-none font-bold">
          +
        </span>
        <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] text-foreground leading-none font-bold">
          +
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] text-foreground leading-none font-bold">
          +
        </span>
      </div>

      {/* Top Metadata Header: Category & Index */}
      <div className="flex items-center justify-between pb-3 text-xs font-mono border-b border-transparent group-hover:border-foreground/15 transition-colors">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
          [{book.category}]
        </span>
        <span className="text-[10px] text-muted-foreground/80 font-mono">
          #{indexPadded}
        </span>
      </div>

      {/* 
        ======================================================================
        RECTANGULAR BOOK SHAPE:
        "هر کتاب به صورت مستطیلی و کتاب نشون داده بشه"
        Aspect-[1/1.45] book spine crease, book edge pages, and cover depth
        ======================================================================
      */}
      <div className="relative my-3 w-full flex justify-center items-center py-2">
        <div className="relative w-full max-w-[210px] aspect-[1/1.45] rounded-l-sm rounded-r-md shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden bg-zinc-900 border border-black/10">
          {/* Realistic Book Spine Crease & Shadow on the Right (RTL spine) */}
          <div className="absolute top-0 right-0 bottom-0 w-3.5 bg-gradient-to-l from-black/50 via-black/20 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-3.5 bottom-0 w-[1px] bg-white/20 z-20 pointer-events-none" />
          
          {/* Bottom Pages Edge Simulation */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#E8E6DF] to-transparent z-10 pointer-events-none opacity-80" />

          {/* Book Cover Image */}
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle Spine Title Hint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
              سال: {book.year} • {book.pages} ص
            </span>
          </div>

          {/* Purchased Badge on Book Cover */}
          {book.isPurchased && (
            <div className="absolute top-2.5 left-2.5 z-20 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Check className="w-3 h-3" />
              خریده شد
            </div>
          )}
        </div>
      </div>

      {/* Book Information Section */}
      <div className="space-y-1.5 pt-1">
        <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
          {book.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
          <span className="line-clamp-1">{book.author}</span>
          <span className="font-mono text-[11px] shrink-0">{book.year}</span>
        </div>

        {/* Price & Rating Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-border/60">
          <div className="font-mono text-xs font-bold text-foreground">
            {formatPrice(book.price)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>{book.rating}</span>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================
        INTERACTIVE ACTION BUTTONS:
        1. "خریده شد" Button
        2. "نمونه کتاب" (Pop-up) Button
        ======================================================================
      */}
      <div className="mt-4 pt-2.5 border-t border-border/40 grid grid-cols-2 gap-2">
        {/* Sample Pop-up Trigger Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSample(book);
          }}
          className="w-full font-mono text-[11px] gap-1.5 border-foreground/30 hover:border-foreground hover:bg-muted/50 h-8 px-2"
          title="مطالعه گزیده و نمونه کتاب در پاپ‌آپ"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>نمونه کتاب</span>
        </Button>

        {/* Purchase Button */}
        <Button
          type="button"
          variant={book.isPurchased ? "secondary" : "default"}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onMarkPurchased(book.id);
          }}
          className={`w-full font-mono text-[11px] gap-1 h-8 px-2 transition-all ${
            book.isPurchased
              ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          {book.isPurchased ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>خریده شد</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>خرید</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

