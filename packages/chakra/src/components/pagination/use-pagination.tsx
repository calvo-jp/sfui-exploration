import { useMemo } from "react";
import { clamp } from "../../utils";

interface OnChangeValue {
  page: number;
  size: number;
}

interface UsePaginationArg {
  page: number;
  size: number;
  total: number;
  siblingCount: number;
  onChange(newValue: OnChangeValue): void;
}

export function usePagination({
  page,
  size,
  total,
  onChange,
  siblingCount,
}: UsePaginationArg) {
  const numOfPages = Math.ceil(total / size);
  const isLastPage = page >= numOfPages;
  const isFirstPage = page === 1;

  const range = useMemo(() => {
    return getRange({
      page,
      size,
      total,
    });
  }, [page, size, total]);

  const pages = useMemo(() => {
    return getPages({
      page,
      numOfPages,
      siblingCount,
    });
  }, [page, numOfPages, siblingCount]);

  const next = () => onChange({ size, page: incr(page) });
  const prev = () => onChange({ size, page: decr(page) });

  const goto = (p: number) =>
    onChange({
      size,
      page: clamp(p, 1, numOfPages),
    });

  const updateSize = (s: number) =>
    onChange({
      size: s,
      page: 1,
    });

  return {
    page,
    size,
    total,
    pages,
    range,
    numOfPages,
    isFirstPage,
    isLastPage,
    next,
    prev,
    goto,
    updateSize,
  };
}

interface GetPagesArg {
  page: number;
  numOfPages: number;
  siblingCount: number;
}

function getPages({
  page,
  numOfPages,
  siblingCount,
}: GetPagesArg): IPaginationPage[] {
  if (numOfPages <= 0) return [];

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

  const lastPage = numOfPages;
  const firstPage = 1;
  const doubledSiblingCount = siblingCount + siblingCount;
  const isCloseToFirstPage = page - (doubledSiblingCount + 1) < firstPage;
  const isCloseToLastPage = lastPage < page + (doubledSiblingCount + 1);

  /* removes ellipsis for cases like [1,2,3,...4] */
  if (doubledSiblingCount + 2 >= numOfPages) {
    return Array.from<unknown, IPaginationPage>(
      { length: numOfPages },
      (_, i) => ({
        type: "page",
        value: i + 1,
      }),
    );
  }

  if (isCloseToFirstPage) {
    return [
      ...Array.from<unknown, IPaginationPage>(
        { length: doubledSiblingCount + 1 },
        (_, i) => ({
          type: "page",
          value: i + 1,
        }),
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
      ...Array.from<unknown, IPaginationPage>(
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
    ...Array.from<unknown, IPaginationPage>(
      { length: siblingCount },
      (_, i) => ({
        type: "page",
        value: page - 1 - i,
      }),
    ).reverse(),
    {
      type: "page",
      value: page,
    },
    ...Array.from<unknown, IPaginationPage>(
      { length: siblingCount },
      (_, i) => ({
        type: "page",
        value: page + 1 + i,
      }),
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

interface GetRangeArg {
  page: number;
  size: number;
  total: number;
}

function getRange({ page, size, total }: GetRangeArg): IPaginationRange {
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

const incr = (v: number, n = 1) => v + n;
const decr = (v: number, n = 1) => v - n;

export type UsePaginationReturn = ReturnType<typeof usePagination>;

export type IPaginationPage =
  | {
      type: "page";
      value: number;
    }
  | {
      type: "ellipsis";
      value?: never;
    };

export interface IPaginationRange {
  start: number;
  until: number;
}
