import { Page } from "./types";

interface UsePagesArgs {
  size: number;
  total: number;
  siblingCount: number;
}

export function usePages({ size, total, siblingCount }: UsePagesArgs): Page[] {
  const numOfPages = Math.ceil(total / size);

  console.log(numOfPages);

  return [];
}
