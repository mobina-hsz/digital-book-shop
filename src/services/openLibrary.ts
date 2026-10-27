import { Book } from "@/types/book";
import { INITIAL_BOOKS } from "@/data/booksData";

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  number_of_pages_median?: number;
  ratings_average?: number;
  ratings_count?: number;
}

export async function searchOpenLibrary(query: string): Promise<Book[]> {
  if (!query || query.trim().length === 0) {
    return INITIAL_BOOKS;
  }

  const trimmed = query.trim().toLowerCase();

  // First, search within local curated books (fast, instant, Persian & English titles)
  const localMatches = INITIAL_BOOKS.filter(
    (b) =>
      b.title.toLowerCase().includes(trimmed) ||
      (b.originalTitle && b.originalTitle.toLowerCase().includes(trimmed)) ||
      b.author.toLowerCase().includes(trimmed) ||
      (b.translator && b.translator.toLowerCase().includes(trimmed)) ||
      b.category.toLowerCase().includes(trimmed) ||
      b.tags.some((t) => t.toLowerCase().includes(trimmed))
  );

  // If we have strong local matches and query is in Persian, return them first
  const isPersian = /[\u0600-\u06FF]/.test(query);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const encodedQuery = encodeURIComponent(query);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodedQuery}&limit=10&fields=key,title,author_name,first_publish_year,cover_i,isbn,subject,number_of_pages_median,ratings_average,ratings_count`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      return localMatches.length > 0 ? localMatches : INITIAL_BOOKS;
    }

    const data = await res.json();
    const docs: OpenLibraryDoc[] = data.docs || [];

    const remoteBooks: Book[] = docs
      .filter((doc) => doc.title && (doc.cover_i || doc.isbn?.length))
      .map((doc, idx) => {
        const coverUrl = doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : doc.isbn?.[0]
          ? `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`
          : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800";

        const category = mapSubjectsToCategory(doc.subject);
        const basePrice = 120000 + ((idx * 37) % 18) * 10000;

        return {
          id: `ol-${doc.key.replace(/\//g, "-")}`,
          title: doc.title,
          originalTitle: doc.title,
          author: doc.author_name?.[0] || "نویسنده ناشناس",
          year: doc.first_publish_year || 2000,
          category,
          price: basePrice,
          rating: Number((doc.ratings_average || 4.2 + (idx % 7) * 0.1).toFixed(1)),
          reviewsCount: doc.ratings_count || 120 + idx * 45,
          cover: coverUrl,
          publisher: "Open Library Archive",
          pages: doc.number_of_pages_median || 280,
          isbn: doc.isbn?.[0] || `OL-${doc.key.replace("/works/", "")}`,
          openLibraryKey: doc.key,
          quote: `«یکی از آثار برگزیده و ثبتی در پایگاه جهانی Open Library»`,
          description: `این اثر با عنوان "${doc.title}" توسط ${
            doc.author_name?.[0] || "نویسنده"
          } نگاشته شده و نخستین بار در سال ${
            doc.first_publish_year || "نامشخص"
          } انتشار یافته است. این کتاب در رده‌بندی جهانی موضوعات ادبی و پژوهشی به ثبت رسیده است.`,
          sampleExcerpt: {
            chapterTitle: `گزیده نخست: ${doc.title}`,
            totalSamplePages: 2,
            pages: [
              {
                pageNumber: 1,
                content: `این بخش به عنوان نمونه‌ای از اثر "${doc.title}" برای آقا منصور جهت ارزیابی اولیه کتاب در دسترس قرار گرفته است. طبق خواسته آقا منصور، این پیش‌نمایش به شما اجازه می‌دهد پیش از تهیه، لحن و نثر نویسنده (${
                  doc.author_name?.[0] || "نویسنده"
                }) را ارزیابی فرمایید.`,
              },
              {
                pageNumber: 2,
                content: `«کلمات می‌توانند شبیه پرتوهای ایکس باشند؛ اگر به درستی به کار روند، در هر چیزی نفوذ خواهند کرد. خواندن، یعنی سفر به ذهن دیگری بدون برداشتن حتی یک گام فیزیکی.» نسخه کامل این عنوان در پایگاه جهانی Open Library با کلید اختصاصی ${doc.key} نمایه شده است.`,
              },
            ],
          },
          tags: ["Open Library", category, "بین‌المللی"],
        };
      });

    // Merge without duplicates
    const combined = [...localMatches];
    const existingIds = new Set(combined.map((b) => b.title.toLowerCase()));

    for (const b of remoteBooks) {
      if (!existingIds.has(b.title.toLowerCase())) {
        combined.push(b);
        existingIds.add(b.title.toLowerCase());
      }
    }

    return combined.length > 0 ? combined : INITIAL_BOOKS;
  } catch {
    // Graceful fallback to local dataset when network is throttled or offline
    return localMatches.length > 0 ? localMatches : INITIAL_BOOKS;
  }
}

function mapSubjectsToCategory(subjects?: string[]): string {
  if (!subjects || subjects.length === 0) return "ادبیات داستانی";
  const s = subjects.join(" ").toLowerCase();

  if (s.includes("fiction") || s.includes("novel") || s.includes("stories") || s.includes("literature")) {
    return "ادبیات داستانی";
  }
  if (s.includes("philosophy") || s.includes("ethics") || s.includes("thought") || s.includes("logic")) {
    return "فلسفه و اندیشه";
  }
  if (s.includes("psychology") || s.includes("mind") || s.includes("mental") || s.includes("behavior")) {
    return "روانشناسی";
  }
  if (s.includes("history") || s.includes("civilization") || s.includes("culture") || s.includes("war")) {
    return "تاریخ و فرهنگ";
  }
  if (s.includes("science") || s.includes("technology") || s.includes("physics") || s.includes("computer")) {
    return "علم و تکنولوژی";
  }
  if (s.includes("art") || s.includes("film") || s.includes("cinema") || s.includes("music") || s.includes("design")) {
    return "هنر و سینما";
  }

  return "ادبیات داستانی";
}

