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
    return getRange({
      page,
      size,
      total,
    });
  }, [page, size, total]);

  const numOfPages = useMemo(() => {
    return Math.ceil(total / size);
  }, [size, total]);

  const isFirstPage = page === 1;
  const isLastPage = page >= numOfPages;

  const pages = useMemo(() => {
    return getPages({
      page,
      size,
      total,
      numOfPages,
      siblingCount,
      isFirstPage,
      isLastPage,
    });
  }, [page, size, total, numOfPages, siblingCount, isFirstPage, isLastPage]);

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

function getPages({
  page,
  size,
  total,
  numOfPages,
  isFirstPage,
  siblingCount,
}: {
  page: number;
  size: number;
  total: number;
  numOfPages: number;
  siblingCount: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}): Page[] {
  if (numOfPages <= 0) return [];

  console.log({ page });

  /**
   * eg:
   *
   * numOfPages=15
   * siblingCount=2
   *
   * page 1/2/3
   * [1,2,3,4,5,...,15]
   *
   * page 5
   * [1,...,3,4,5,6,...,15]
   *
   * page 15
   * [1,...11,12,13,14,15]
   *
   * page 10
   * [1,...,8,9,10,11,...,15]
   *
   */

  const firstPage = 1;
  const lastPage = numOfPages;
  const doubledSiblingCount = siblingCount + siblingCount;
  const isCloseToFirstPage = page - (doubledSiblingCount + 1) < firstPage;
  const isCloseToLastPage = lastPage < page + (doubledSiblingCount + 1);

  if (doubledSiblingCount + 1 >= numOfPages) {
    return Array.from<unknown, Page>({ length: numOfPages }, (_, i) => ({
      type: "page",
      value: i + 1,
    }));
  }

  if (isCloseToFirstPage) {
    return [
      ...Array.from<unknown, Page>(
        { length: doubledSiblingCount + 1 },
        (_, i) => ({ type: "page", value: i + 1 }),
      ),
      {
        type: "ellipsis",
      },
      {
        type: "page",
        value: lastPage,
      },
    ];
  }

  if (isCloseToLastPage) {
    return [
      {
        type: "page",
        value: firstPage,
      },
      {
        type: "ellipsis",
      },
      ...Array.from<unknown, Page>(
        { length: doubledSiblingCount + 1 },
        (_, i) => ({
          type: "page",
          value: lastPage - i,
        }),
      ).reverse(),
    ];
  }

  return [
    {
      type: "page",
      value: firstPage,
    },
    {
      type: "ellipsis",
    },
    ...Array.from<unknown, Page>({ length: siblingCount }, (_, i) => ({
      type: "page",
      value: page - 1 - i,
    })).reverse(),
    {
      type: "page",
      value: page,
    },
    ...Array.from<unknown, Page>({ length: siblingCount }, (_, i) => ({
      type: "page",
      value: page + 1 + i,
    })),
    {
      type: "ellipsis",
    },
    {
      type: "page",
      value: lastPage,
    },
  ];
}

function getRange({
  page,
  size,
  total,
}: {
  page: number;
  size: number;
  total: number;
}) {
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
