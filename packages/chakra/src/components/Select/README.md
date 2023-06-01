# Select

## Usage

```tsx
function Component() {
  return (
    <Select>
      {({ selectedOption }) => (
        <>
          <SelectTrigger>
            {selectedOption.label ?? "Select option"}
          </SelectTrigger>

          <SelectMenu>
            <SelectMenuItem label="Option 1" value="1" />
            <SelectMenuItem label="Option 2" value="2" />
            <SelectMenuItem label="Option 3" value="3" />
          </SelectMenu>
        </>
      )}
    </Select>
  );
}
```
