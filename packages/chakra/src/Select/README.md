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

          <SelectOptions>
            <SelectOption label="Option 1" value="1" />
            <SelectOption label="Option 2" value="2" />
            <SelectOption label="Option 3" value="3" />
          </SelectOptions>
        </>
      )}
    </Select>
  );
}
```
