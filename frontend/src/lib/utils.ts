import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastStyles = {
  success: "bg-green-500 text-white text-md font-medium",
  error: "bg-red-500 text-white text-md font-medium",
};

export function showToast(toast: any, title: string, className: string) {
  toast({
    title,
    className,
  });
}

export function formatErrorMessage(errorMessage: string | string[]): string {
  return Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
}
