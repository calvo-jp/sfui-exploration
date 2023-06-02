export interface Value {
  page: number;
  size: number;
}

export type Page =
  | { type: "ellipsis"; value?: never }
  | { type: "page"; value: number };

export interface Range {
  start: number;
  until: number;
}

export interface Details {
  page: number;
  size: number;
  total: number;
  range: Range;
  pages: Page[];
  numOfPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}
