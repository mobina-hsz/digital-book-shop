"use client";

import React from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { soundManager } from "@/lib/sound";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Check,
  Star,
  Quote,
  Sparkles,
} from "lucide-react";

interface TactileShelfProps {
  books: Book[];
  onOpenDetails: (book: Book) => void;
  onOpenSample: (book: Book) => void;
  onMarkPurchased: (bookId: string) => void;
}

export function TactileShelf({
  books,
  onOpenDetails,
  onOpenSample,
  onMarkPurchased,
}: TactileShelfProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const activeBook = books[selectedIndex] || books[0];

  const handleSelectBook = (index: number) => {
    setSelectedIndex(index);
    soundManager.playTick();
  };

  const handleNext = () => {
    if (selectedIndex < books.length - 1) {
      handleSelectBook(selectedIndex + 1);
    } else {
      handleSelectBook(0);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      handleSelectBook(selectedIndex - 1);
    } else {
      handleSelectBook(books.length - 1);
    }
  };

  // Keep active book centered in viewport
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = container.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const offsetLeft =
          activeEl.offsetLeft -
          container.offsetWidth / 2 +
          activeEl.offsetWidth / 2;
        container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!activeBook) return null;

  return (
    <div className="border border-foreground/30 bg-[#000000] text-[#FFFFFF] p-6 sm:p-10 my-6 transition-colors shadow-2xl relative overflow-hidden select-none">
      {/* Background Ambience Strip */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#CACACA] to-transparent opacity-30" />

      {/* Top Header Spec */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333333] pb-4 mb-8 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          <span className="tracking-widest uppercase font-bold text-white">
            [قفسه فیزیکی و غلتان A24 // TACTILE CRATE CAROUSEL]
          </span>
          <span className="text-[#888888] hidden sm:inline">
            • الهام‌گرفته از سایت Ravi Klaassens برنده Awwwards
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrev}
            className="h-8 w-8 p-0 border-[#444444] text-white hover:bg-white hover:text-black font-mono rounded-none"
            title="اثر قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <span className="font-mono text-xs text-[#888888] px-2">
            {selectedIndex + 1} / {books.length}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="h-8 w-8 p-0 border-[#444444] text-white hover:bg-white hover:text-black font-mono rounded-none"
            title="اثر بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* The Tactile Horizontal Crate Row */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 sm:gap-10 overflow-x-auto py-10 px-4 sm:px-12 scrollbar-none no-scrollbar snap-x snap-mandatory"
      >
        {books.map((book, idx) => {
          const isActive = idx === selectedIndex;

          return (
            <div
              key={book.id}
              onClick={() => handleSelectBook(idx)}
              className={`relative shrink-0 cursor-pointer transition-all duration-500 ease-out snap-center ${
                isActive
                  ? "scale-110 z-20"
                  : "opacity-40 hover:opacity-80 scale-90 z-10"
              }`}
            >
              {/* Ravi Klaassens Signature Hand-drawn Sketch Ring on Active Book */}
              {isActive && (
                <div className="absolute -inset-4 sm:-inset-6 pointer-events-none z-30 animate-sketch">
                  <svg
                    viewBox="0 0 200 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full stroke-white/80"
                  >
                    <path
                      d="M 12 18 C 65 6, 145 10, 186 26 C 205 60, 202 220, 185 260 C 140 278, 50 274, 15 255 C -5 210, -2 65, 12 18 Z"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              {/* Rectangular Book Mock */}
              <div className="relative w-36 sm:w-48 aspect-[1/1.45] rounded-l-sm rounded-r-md shadow-2xl overflow-hidden border border-white/20 bg-zinc-950 transition-transform">
                {/* Book Spine Crease RTL */}
                <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-3 bottom-0 w-[1px] bg-white/20 z-10 pointer-events-none" />

                {/* Cover Image */}
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />

                {/* Purchased Status Pin */}
                {book.isPurchased && (
                  <div className="absolute top-2 left-2 z-20 bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-none flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    خریده شد
                  </div>
                )}
              </div>

              {/* Number Index Below */}
              <div className="text-center font-mono text-[10px] text-[#888888] mt-3">
                [{String(idx + 1).padStart(2, "0")}]
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Media Stage: Billing Block & Editorial Poster Details */}
      <div className="mt-8 pt-8 border-t border-[#222222] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Title, Quote & Billing Block */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#888888] uppercase tracking-wider">
              [{activeBook.category}]
            </span>
            <span className="font-mono text-xs text-[#888888]">
              سال انتشار: {activeBook.year}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
              <Star className="w-3 h-3 fill-current" />
              <span>{activeBook.rating} / ۵</span>
            </div>
          </div>

          <h2
            onClick={() => onOpenDetails(activeBook)}
            className="text-3xl sm:text-5xl font-serif font-bold text-white hover:underline cursor-pointer leading-tight tracking-tight"
          >
            {activeBook.title}
          </h2>

          {/* Critic Pull-Quote */}
          {activeBook.quote && (
            <div className="flex items-start gap-3 bg-[#111111] border-r-2 border-white p-4 font-serif text-sm sm:text-base italic text-[#DDDDDD]">
              <Quote className="w-5 h-5 text-white/40 shrink-0 mt-0.5 -scale-x-100" />
              <span>{activeBook.quote}</span>
            </div>
          )}

          {/* Film-Poster Style Billing Block (A24 Poster Spec) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] font-mono border-y border-[#222222] py-3 text-[#AAAAAA]">
            <div>
              <span className="text-[#666666] block">[نویسنده]</span>
              <span className="text-white font-sans">{activeBook.author}</span>
            </div>
            <div>
              <span className="text-[#666666] block">[سال انتشار]</span>
              <span className="text-white">{activeBook.year}</span>
            </div>
            <div>
              <span className="text-[#666666] block">[تعداد صفحات]</span>
              <span className="text-white">{activeBook.pages} صفحه</span>
            </div>
            <div>
              <span className="text-[#666666] block">[بهای نسخه]</span>
              <span className="text-white font-bold">
                {formatPrice(activeBook.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Fast Actions */}
        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
          {/* Sample Pop-up Trigger */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => onOpenSample(activeBook)}
            className="w-full border-white text-white hover:bg-white hover:text-black font-mono text-xs gap-2 rounded-none h-12"
          >
            <BookOpen className="w-4 h-4" />
            مطالعه نمونه اثر (Pop-up)
          </Button>

          {/* Buy Button */}
          <Button
            type="button"
            variant={activeBook.isPurchased ? "secondary" : "default"}
            size="lg"
            onClick={() => onMarkPurchased(activeBook.id)}
            className={`w-full font-mono text-xs gap-2 rounded-none h-12 transition-all ${
              activeBook.isPurchased
                ? "bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {activeBook.isPurchased ? (
              <>
                <Check className="w-4 h-4" />
                کتاب خریده شد ✓
              </>
            ) : (
              <>خرید کتاب ({formatPrice(activeBook.price)})</>
            )}
          </Button>

          {/* View Full Specs */}
          <button
            onClick={() => onOpenDetails(activeBook)}
            className="text-center font-mono text-[11px] text-[#888888] hover:text-white pt-1 underline"
          >
            مشاهده شناسنامه و اطلاعات کامل اثر ←
          </button>
        </div>
      </div>
    </div>
  );
}
