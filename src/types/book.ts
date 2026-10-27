export interface BookSamplePage {
  pageNumber: number;
  content: string;
}

export interface BookSampleExcerpt {
  chapterTitle: string;
  totalSamplePages: number;
  pages: BookSamplePage[];
}

export interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  year: number;
  category: string;
  price: number; // in Tomans
  rating: number; // e.g. 4.8
  reviewsCount: number;
  cover: string;
  spineColor?: string;
  coverBgColor?: string;
  description: string;
  publisher: string;
  translator?: string;
  pages: number;
  isbn: string;
  openLibraryKey?: string;
  quote?: string;
  sampleExcerpt: BookSampleExcerpt;
  tags: string[];
  isPurchased?: boolean;
}

export type SortOption =
  | "popular"
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "title";

export interface FilterState {
  search: string;
  category: string;
  sortBy: SortOption;
  minPrice: number;
  maxPrice: number;
  purchasedOnly: boolean;
}

export interface SubscriptionTier {
  id: string;
  code: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

