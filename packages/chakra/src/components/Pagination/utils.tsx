import { useMemo } from "react";
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
  const range = useMemo(() => {
    return getRange(page, size, total);
  }, [
    /* */
    page,
    size,
    total,
  ]);

  const numOfPages = useMemo(() => {
    return Math.ceil(total / size);
  }, [
    /* */
    size,
    total,
  ]);

  const pages = useMemo(() => {
    return getPages(page, size, total, siblingCount, numOfPages);
  }, [
    /* */
    page,
    size,
    total,
    numOfPages,
    siblingCount,
  ]);

  const isFirstPage = page === 1;
  const isLastPage = page >= numOfPages;

  console.log(numOfPages);

  return {
    page,
    size,
    total,
    pages,
    range,
    numOfPages,
    isFirstPage,
    isLastPage,
  };
}

function getPages(
  page: number,
  size: number,
  total: number,
  siblingCount: number,
  numOfPages: number,
): Page[] {
  const pages: Page[] = [];

  return pages;
}

function getRange(page: number, size: number, total: number) {
  let start: number;
  let until: number;

  start = (page - 1) * size + 1;
  until = start + size - 1;

  start = clamp(start, 1, total);
  until = clamp(until, 1, total);

  return {
    start,
    until,
  };
}
