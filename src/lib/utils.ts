import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs));
  } catch {
    return inputs.flat().filter(Boolean).join(" ");
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function formatPersianNumber(num: number | string): string {
  return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(Number(num));
}

