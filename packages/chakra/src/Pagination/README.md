# Pagination

## Usage

```tsx
function Component() {
  return (
    <Pagination>
      <PaginationRange /* Page 1-10 of 100 */ />
      <Spacer />
      <PaginationSizeControl sizes={[5, 25, 50, 100]} />
      <PaginationTriggerGroup>
        {({ pages }) => (
          <>
            <PaginationPrevPageTrigger />
            <PaginationNextPageTrigger />

            {pages.map((page) => (
              <PaginationPageTrigger isReadOnly {...page} />
            ))}
          </>
        )}
      </PaginationTriggerGroup>
    </Pagination>
  );
}
```

This should also be possible

```tsx
function Component() {
  return (
    <Pagination>
      {({ pages /* , page, size */ }) => (
        <>
          <PaginationRange /* Page 1-10 of 100 */ />
          <Spacer />
          <PaginationSizeControl sizes={[5, 25, 50, 100]} />
          <PaginationTriggerGroup>
            <PaginationPrevPageTrigger />
            <PaginationNextPageTrigger />

            {pages.map((page) => (
              <PaginationPageTrigger isReadOnly {...page} />
            ))}
          </PaginationTriggerGroup>
        </>
      )}
    </Pagination>
  );
}
```
