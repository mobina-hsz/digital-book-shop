"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
  MoveHorizontal,
  RotateCcw,
} from "lucide-react";

interface Circular3DCarouselProps {
  books: Book[];
  onOpenDetails: (book: Book) => void;
  onOpenSample: (book: Book) => void;
  onMarkPurchased: (bookId: string) => void;
}

export function Circular3DCarousel({
  books,
  onOpenDetails,
  onOpenSample,
  onMarkPurchased,
}: Circular3DCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [lastDragX, setLastDragX] = useState(0);
  const [dragVelocity, setDragVelocity] = useState(0);
  const [radius, setRadius] = useState(540);
  const animationFrameRef = useRef<number | null>(null);

  const numItems = books.length;
  const anglePerItem = 360 / numItems;

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setRadius(340);
        } else if (window.innerWidth < 1024) {
          setRadius(460);
        } else {
          setRadius(560);
        }
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Determine which book is currently in the center front (closest to 0 degrees modulo 360)
  const normalizedRotation = ((-rotationAngle % 360) + 360) % 360;
  let activeIndex = Math.round(normalizedRotation / anglePerItem) % numItems;
  if (activeIndex < 0) activeIndex += numItems;
  const activeBook = books[activeIndex] || books[0];

  // Snap to nearest item
  const snapToNearest = useCallback(() => {
    const targetAngle = -Math.round(-rotationAngle / anglePerItem) * anglePerItem;
    animateToAngle(targetAngle);
  }, [rotationAngle, anglePerItem]);

  const animateToAngle = (target: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const start = rotationAngle;
    const diff = target - start;
    const duration = 400; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setRotationAngle(start + diff * ease);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        soundManager.playTick();
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const handleNext = () => {
    animateToAngle(rotationAngle - anglePerItem);
  };

  const handlePrev = () => {
    animateToAngle(rotationAngle + anglePerItem);
  };

  // Click on a specific book rotates it to center
  const handleClickBook = (index: number) => {
    if (index === activeIndex) {
      onOpenDetails(books[index]);
      return;
    }
    const currentAngleForItem = (index * anglePerItem + rotationAngle) % 360;
    let diff = (currentAngleForItem + 180) % 360 - 180;
    if (diff < -180) diff += 360;
    animateToAngle(rotationAngle - diff);
  };

  // Pointer drag events with inertia
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setLastDragX(e.clientX);
    setDragVelocity(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastDragX;
    setLastDragX(e.clientX);
    setDragVelocity(deltaX);
    // Sensitivity: 0.28 degrees per pixel
    setRotationAngle((prev) => prev + deltaX * 0.28);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Apply inertia drift then snap
    const finalVelocity = dragVelocity;
    if (Math.abs(finalVelocity) > 2) {
      const extraAngle = finalVelocity * 5;
      const projectedAngle = rotationAngle + extraAngle;
      const targetSnap = -Math.round(-projectedAngle / anglePerItem) * anglePerItem;
      animateToAngle(targetSnap);
    } else {
      snapToNearest();
    }
  };

  // Mouse wheel rotation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    animateToAngle(rotationAngle + delta * anglePerItem);
  };

  return (
    <div className="relative border border-foreground/30 bg-[#000000] text-[#FFFFFF] py-12 px-4 sm:px-8 my-8 shadow-2xl overflow-hidden select-none">
      {/* Top Editorial Spec Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#222222] pb-4 mb-8 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-white rounded-none animate-pulse" />
          <span className="tracking-widest uppercase font-bold text-white">
            [قفسه سه‌بعدی غلتان A24 // 3D CIRCULAR CAROUSEL]
          </span>
          <span className="text-[#888888] hidden md:inline">
            • الهام‌گرفته از React Bits و ادیتوریال Ravi Klaassens
          </span>
        </div>

        {/* Drag Hint & Nav Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#888888] border border-[#333333] px-2.5 py-1">
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>درگ کنید یا دکمه‌ها را بزنید</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="h-8 w-8 p-0 border-[#444444] text-white hover:bg-white hover:text-black font-mono rounded-none"
              title="کتاب قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="font-mono text-xs text-[#AAAAAA] px-2">
              {activeIndex + 1} / {numItems}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="h-8 w-8 p-0 border-[#444444] text-white hover:bg-white hover:text-black font-mono rounded-none"
              title="کتاب بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================
        THE 3D PERSPECTIVE CYLINDER STAGE
        ======================================================================
      */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Subtle Ambient Stage Lighting Ring */}
        <div className="absolute inset-x-12 bottom-12 h-16 bg-gradient-to-t from-white/10 to-transparent blur-2xl pointer-events-none rounded-full" />

        {/* 3D Ring Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          {books.map((book, idx) => {
            const itemAngle = idx * anglePerItem;
            const currentTotalAngle = itemAngle + rotationAngle;
            // Angle normalized to -180 .. 180
            const normalizedAngle = ((currentTotalAngle % 360) + 540) % 360 - 180;
            const isCenter = Math.abs(normalizedAngle) < anglePerItem / 1.8;

            // Compute distance from front center (0 to 1)
            const distFromFront = Math.abs(normalizedAngle) / 180;
            // Opacity: front is 1.0, back fades to 0.25
            const opacity = Math.max(0.2, 1 - distFromFront * 1.1);
            // Scale: front is 1.1, back is 0.78
            const scale = 1.12 - distFromFront * 0.35;
            // Lighting shadow overlay: back items are darker
            const darkness = distFromFront * 0.75;

            return (
              <div
                key={book.id}
                onClick={() => handleClickBook(idx)}
                className="absolute flex flex-col items-center justify-center cursor-pointer transition-opacity duration-300 select-none"
                style={{
                  transform: `rotateY(${currentTotalAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  opacity: opacity,
                  zIndex: Math.round((1 - distFromFront) * 100),
                }}
              >
                {/* Hand-drawn sketch ring around the active center book (Ravi Klaassens signature) */}
                {isCenter && (
                  <div className="absolute -inset-5 pointer-events-none z-30 animate-sketch">
                    <svg
                      viewBox="0 0 220 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full stroke-white/90"
                    >
                      <path
                        d="M 14 20 C 70 8, 155 12, 200 30 C 220 70, 215 235, 195 275 C 150 295, 55 290, 18 270 C -6 220, -3 70, 14 20 Z"
                        strokeWidth="2.2"
                        strokeDasharray="6 4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}

                {/* 
                  Rectangular Book Display in 3D:
                  - Aspect ratio 1:1.45
                  - Real authentic cover artwork
                  - Spine crease on right (RTL)
                  - Hover / Focus A24 perimeter outlines & crosshairs [+]
                */}
                <div className="group relative w-36 sm:w-48 aspect-[1/1.45] rounded-l-sm rounded-r-md shadow-2xl overflow-hidden border border-white/20 bg-zinc-950">
                  {/* Darkness overlay for 3D depth */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10 transition-colors"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, ${darkness})`,
                    }}
                  />

                  {/* Spine Crease RTL */}
                  <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-20 pointer-events-none" />
                  <div className="absolute top-0 right-3 bottom-0 w-[1px] bg-white/20 z-20 pointer-events-none" />

                  {/* Bottom Pages Edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#E8E6DF] to-transparent z-10 pointer-events-none opacity-80" />

                  {/* Real Book Cover Image */}
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Purchased Badge */}
                  {book.isPurchased && (
                    <div className="absolute top-2 left-2 z-20 bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-none flex items-center gap-0.5">
                      <Check className="w-3 h-3" />
                      خریده شد
                    </div>
                  )}

                  {/* Hover A24 Lines & Corner Crosshairs */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                    <div className="absolute inset-0 border-2 border-white" />
                    <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-white font-bold leading-none">+</span>
                    <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-white font-bold leading-none">+</span>
                    <span className="absolute -bottom-1.5 -right-1.5 font-mono text-[10px] text-white font-bold leading-none">+</span>
                    <span className="absolute -bottom-1.5 -left-1.5 font-mono text-[10px] text-white font-bold leading-none">+</span>
                  </div>
                </div>

                {/* Micro Number Below Book */}
                <span className="mt-2.5 font-mono text-[10px] text-[#888888]">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        ======================================================================
        ACTIVE MEDIA STAGE: BILLING BLOCK & EDITORIAL POSTER ACTIONS
        ======================================================================
      */}
      <div className="mt-6 pt-8 border-t border-[#222222] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Title, Quote & Billing Block */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-[#888888] uppercase tracking-wider">
              [{activeBook.category}]
            </span>
            <span className="font-mono text-xs text-[#888888]">
              سال انتشار: {activeBook.year}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{activeBook.rating} / ۵</span>
              <span className="text-[#666666]">({activeBook.reviewsCount} نظر)</span>
            </div>
          </div>

          <h2
            onClick={() => onOpenDetails(activeBook)}
            className="text-3xl sm:text-5xl font-serif font-black text-white hover:underline cursor-pointer leading-tight tracking-tight"
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

          {/* Film-Poster Billing Block */}
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

        {/* Right Column: Actions */}
        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
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

