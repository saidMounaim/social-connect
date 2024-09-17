import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showToast(toast: any, title: string, type: string) {
  toast({
    className: `${
      type === "danger"
        ? "bg-red-500"
        : type === "success"
        ? "bg-green-500"
        : ""
    } text-white text-md font-medium`,
    title,
  });
}

export function formatErrorMessage(errorMessage: string | string[]): string {
  return Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
}

export function getInitials(fullName: string) {
  if (!fullName) return "SM";
  const nameParts = fullName.trim().split(" ");
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials;
}

export function timeAgo(date: any) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
