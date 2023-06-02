export interface Value {
  page: number;
  size: number;
}

export type Page =
  | {
      type: "ellipsis";
      value?: never;
    }
  | {
      type: "page";
      value: number;
    };

export interface Range {
  start: number;
  until: number;
}
