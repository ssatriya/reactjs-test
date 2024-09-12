import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import MOCK_DATA from "@/MOCK_DATA.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchPaginatedData = async (page: number, pageSize: number) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = MOCK_DATA.slice(start, end);
  const totalPages = Math.ceil(MOCK_DATA.length / pageSize);

  return { paginatedData, totalPages };
};

export function getCurrentDate(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
