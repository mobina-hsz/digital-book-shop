"use client";

import React from "react";
import { Book } from "@/types/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { soundManager } from "@/lib/sound";
import {
  BookOpen,
  Check,
  Star,
  ShoppingBag,
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
      className="group relative flex flex-col justify-between bg-card text-card-foreground transition-all duration-300 p-4 sm:p-5 cursor-pointer border border-transparent select-none"
      onClick={() => {
        soundManager.playTick();
        onOpenDetails(book);
      }}
      onMouseEnter={() => soundManager.playTick()}
    >
      {/* 
        ======================================================================
        CRITICAL HOVER BORDER SYSTEM (A24 Registration Outline System):
        "اون خط های دورش رو وقتی موس بیاد نمایش داده بشه حتما"
        - Zero opacity by default
        - In hover: Crisp 1.5px solid border + corner registration marks [+] appear!
        ======================================================================
      */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-30">
        {/* Full Framing Perimeter Box Lines */}
        <div className="absolute inset-0 border-2 border-foreground" />

        {/* A24 Editorial Corner Crosshairs */}
        <span className="absolute -top-2 -right-2 font-mono text-[12px] text-foreground leading-none font-bold select-none">
          +
        </span>
        <span className="absolute -top-2 -left-2 font-mono text-[12px] text-foreground leading-none font-bold select-none">
          +
        </span>
        <span className="absolute -bottom-2 -right-2 font-mono text-[12px] text-foreground leading-none font-bold select-none">
          +
        </span>
        <span className="absolute -bottom-2 -left-2 font-mono text-[12px] text-foreground leading-none font-bold select-none">
          +
        </span>
      </div>

      {/* Top Metadata Header: Category & Index */}
      <div className="flex items-center justify-between pb-3 text-xs font-mono border-b border-border/40 group-hover:border-foreground/20 transition-colors">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors font-bold">
          [{book.category}]
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          NO. {indexPadded}
        </span>
      </div>

      {/* 
        ======================================================================
        RECTANGULAR BOOK SHAPE:
        "هر کتاب به صورت مستطیلی و کتاب نشون داده بشه"
        Aspect-[1/1.45] book spine crease, book edge pages, and cover depth
        ======================================================================
      */}
      <div className="relative my-4 w-full flex justify-center items-center py-2">
        <div className="relative w-full max-w-[210px] aspect-[1/1.45] rounded-l-sm rounded-r-md shadow-md group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1.5 overflow-hidden bg-zinc-950 border border-black/20">
          {/* Realistic Book Spine Crease & Shadow on the Right (RTL spine) */}
          <div className="absolute top-0 right-0 bottom-0 w-3.5 bg-gradient-to-l from-black/60 via-black/25 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-3.5 bottom-0 w-[1px] bg-white/20 z-20 pointer-events-none" />
          
          {/* Bottom Pages Edge Simulation */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-t from-[#E8E6DF] to-transparent z-10 pointer-events-none opacity-80" />

          {/* Book Cover Image */}
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover Spine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
              سال: {book.year} • {book.pages} ص
            </span>
          </div>

          {/* Purchased Badge on Book Cover */}
          {book.isPurchased && (
            <div className="absolute top-2.5 left-2.5 z-20 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-none shadow flex items-center gap-1">
              <Check className="w-3 h-3" />
              خریده شد
            </div>
          )}
        </div>
      </div>

      {/* Book Information Section */}
      <div className="space-y-2 pt-1">
        <h3 className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
          {book.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
          <span className="line-clamp-1">{book.author}</span>
          <span className="font-mono text-[11px] shrink-0 font-medium">[{book.year}]</span>
        </div>

        {/* Price & Rating Bar */}
        <div className="flex items-center justify-between pt-2.5 border-t border-dashed border-border/70">
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
        1. "نمونه کتاب" (Pop-up) Button
        2. "خریده شد" Button
        ======================================================================
      */}
      <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-2 gap-2">
        {/* Sample Pop-up Trigger Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPageTurn();
            onOpenSample(book);
          }}
          className="w-full font-mono text-[11px] gap-1.5 border-foreground/40 hover:border-foreground hover:bg-muted rounded-none h-8 px-2"
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
          className={`w-full font-mono text-[11px] gap-1 rounded-none h-8 px-2 transition-all ${
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
