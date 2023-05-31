import { clamp } from "../utils";

export function PaginationRange() {
  return null;
}

export function getRange(page: number, size: number, total: number) {
  let start: number;
  let until: number;

  start = (page - 1) * size + 1;
  until = page * size + size;

  start = clamp(start, 1, total);
  until = clamp(until, 1, total);

  return `Page ${start}-${until} to ${total}`;
}
