# Pagination

## Usage

```tsx
function Component() {
  return (
    <Pagination>
      <PaginationRange /* Page 1-10 of 100 */ />
      <Spacer />
      <PaginationSizeControl sizes={[5, 25, 50, 100]} />
      <PaginationTriggers>
        {({ pages }) => (
          <>
            <PaginationPrevPageTrigger />
            <PaginationNextPageTrigger />

            {pages.map((page) => (
              <PaginationPageTrigger isReadOnly {...page} />
            ))}
          </>
        )}
      </PaginationTriggers>
    </Pagination>
  );
}
```
