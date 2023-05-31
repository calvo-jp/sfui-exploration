# Pagination

## Usage

```tsx
function Component() {
  return (
    <Pagination>
      <PaginationSummary /* Page 1-10 of 100 */ />

      <Spacer />

      <PaginationSizeControl />

      <PaginationTriggers>
        {({ pages }) => (
          <>
            <PaginationPrevPageTrigger />
            <PaginationNextPageTrigger />

            {pages.map((page) => (
              <PaginationPageTrigger {...page} />
            ))}
          </>
        )}
      </PaginationTriggers>
    </Pagination>
  );
}
```
