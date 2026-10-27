"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/data/booksData";
import { SortOption } from "@/types/book";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  isPurchasedOnly: boolean;
  onTogglePurchasedOnly: () => void;
  totalResults: number;
  onResetFilters: () => void;
  isSearchingRemote?: boolean;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "محبوب‌ترین‌ها" },
  { id: "newest", label: "جدیدترین انتشار" },
  { id: "oldest", label: "کهن‌ترین آثار" },
  { id: "rating", label: "بالاترین امتیاز" },
  { id: "price-asc", label: "ارزان‌ترین به گران‌ترین" },
  { id: "price-desc", label: "گران‌ترین به ارزان‌ترین" },
  { id: "title", label: "الفبایی (الف - ی)" },
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  isPurchasedOnly,
  onTogglePurchasedOnly,
  totalResults,
  onResetFilters,
  isSearchingRemote = false,
}: FilterBarProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "همه" ||
    selectedSort !== "popular" ||
    isPurchasedOnly;

  return (
    <div className="space-y-4 border-b border-foreground/15 pb-6">
      {/* Search Input & Sort Selector Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجو در کتاب‌ها، نویسندگان، مترجمان یا Open Library..."
            className="pr-10 pl-10 h-11 text-xs sm:text-sm font-sans border-foreground/30 focus-visible:border-foreground rounded-none bg-background shadow-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              title="پاک کردن جستجو"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isSearchingRemote && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              در حال جستجو...
            </div>
          )}
        </div>

        {/* Sort Dropdown & Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sort Selector */}
          <div className="flex items-center gap-2 border border-foreground/30 px-3 h-11 bg-background font-mono text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground hidden sm:inline">مرتب‌سازی:</span>
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-foreground focus:outline-none cursor-pointer font-sans text-xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-background text-foreground">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Purchased Filter Toggle */}
          <Button
            type="button"
            variant={isPurchasedOnly ? "a24Solid" : "outline"}
            size="default"
            onClick={onTogglePurchasedOnly}
            className="h-11 font-mono text-xs border-foreground/30 hover:border-foreground"
          >
            {isPurchasedOnly ? "نمایش فقط خریده‌شده‌ها ✓" : "کتاب‌های خریده‌شده"}
          </Button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="default"
              onClick={onResetFilters}
              className="h-11 font-mono text-xs text-muted-foreground hover:text-foreground gap-1"
            >
              <X className="w-3.5 h-3.5" />
              بازنشانی
            </Button>
          )}
        </div>
      </div>

      {/* Categories Filter Tabs (A24 Editorial Pills) */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-mono transition-all duration-150 border select-none ${
                  isActive
                    ? "border-foreground bg-foreground text-background font-bold shadow-sm"
                    : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div className="hidden lg:flex items-center font-mono text-xs text-muted-foreground shrink-0">
          <span>نمایش {new Intl.NumberFormat("fa-IR").format(totalResults)} عنوان</span>
        </div>
      </div>
    </div>
  );
}

