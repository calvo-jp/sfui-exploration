import { clamp } from "../../utils";
import { Details, Page } from "./types";

interface UsePaginationArg {
  page: number;
  size: number;
  total: number;
  siblingCount: number;
}

export function usePagination({
  page,
  size,
  total,
  siblingCount,
}: UsePaginationArg): Details {
  const range = getRange(page, size, total);

  const pages: Page[] = [
    {
      type: "page",
      value: 1,
    },
  ];

  const numOfPages = Math.ceil(total / size);

  console.log(numOfPages);

  return {
    page,
    size,
    total,
    pages,
    range,
    numOfPages,
  };
}

export function getRange(page: number, size: number, total: number) {
  let start: number;
  let until: number;

  start = (page - 1) * size + 1;
  until = start + size - 1;

  start = clamp(start, 1, total);
  until = clamp(until, 1, total);

  return {
    start,
    until,
    toString() {
      return `Page ${start}-${until} to ${until}`;
    },
  };
}

export type UsePaginationReturn = ReturnType<typeof usePagination>;
