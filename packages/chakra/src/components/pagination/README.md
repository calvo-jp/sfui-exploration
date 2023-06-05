# Pagination

## Usage

```tsx
function Component() {
  return (
    <Pagination>
      <PaginationRange /* Page 1-10 of 100 */ />

      <Spacer />

      <PaginationSizeControl sizes={[5, 25, 50, 100]} />
      <PaginationControlGroup>
        {({ pages }) => (
          <>
            <PaginationPrevControl />
            <PaginationNextControl />

            {pages.map((page) => (
              <PaginationPageControl isReadOnly {...page} />
            ))}
          </>
        )}
      </PaginationControlGroup>
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
          <Spacer />

          <PaginationRange /* Page 1-10 of 100 */ />

          <PaginationControlGroup>
            <PaginationSizeControl sizes={[5, 25, 50, 100]} />
            <PaginationPrevControl />

            {pages.map((page) => (
              <PaginationPageControl isReadOnly {...page} />
            ))}

            <PaginationNextControl />
          </PaginationControlGroup>
        </>
      )}
    </Pagination>
  );
}
```
