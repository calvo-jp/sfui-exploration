import { chakra } from "@chakra-ui/react";
import { clamp } from "../utils";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";

export function PaginationRange() {
  const styles = usePaginationStyles();
  const context = usePaginationContext();

  return (
    <chakra.div __css={styles.range}>
      {getRange(
        //
        context.value.page,
        context.value.size,
        context.total,
      )}
    </chakra.div>
  );
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
