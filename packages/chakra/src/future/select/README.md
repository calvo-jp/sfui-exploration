# Select

Replacement to native select to have a consistent UI across browsers

## Usage

```tsx
function Component() {
  return (
    <Select
      value="1"
      onChange={function (newValue) {
        console.log(newValue /* string | "" */);
      }}
      isInvalid
      isDisabled
      isReadOnly
    >
      {function ({ selectedOption }) {
        return (
          <>
            <SelectTrigger>
              {selectedOption.label ?? "Select option"}

              <Spacer />
              <SelectArrow />
            </SelectTrigger>

            <SelectOptions>
              <SelectOption label="Option 1" value="1" />
              <SelectOption label="Option 2" value="2" />
              <SelectOption label="Option 3" value="3" />
            </SelectOptions>
          </>
        );
      }}
    </Select>
  );
}
```
