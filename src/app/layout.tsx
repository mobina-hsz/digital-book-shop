import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ویترین کتاب‌های الکترونیک آقا منصور | شرکت عقب‌گستر (A24 Style)",
  description:
    "ویترین اختصاصی مشاهده و کشف کتاب‌های الکترونیکی با دیزاین سیستم A24، اطلاعات نویسنده، سال، موضوع، قیمت، امکان خرید و پیش‌نمایش پاپ‌آپ اثر بدون نیاز به دیتابیس.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen font-sans">
        {children}
        <Toaster
          position="bottom-left"
          richColors
          toastOptions={{
            style: {
              borderRadius: "0px",
              fontFamily: "var(--font-vazirmatn), sans-serif",
              border: "1px solid #111",
            },
          }}
        />
      </body>
    </html>
  );
}

