# Combobox (AutoComplete)

## Usage

```tsx
function Component() {
  return (
    <Combobox>
      <ComboboxTrigger>
        {({ selectedOptions }) => (
          <>
            {selectedOptions.map((selectedOption) => (
              <ComboboxTag key={selectedOption.value}>
                <ComboboxTagLabel> {selectedOption.label}</ComboboxTagLabel>
                <ComboboxTagCloseButton>
                  {selectedOption.label}
                </ComboboxTagCloseButton>
              </ComboboxTag>
            ))}
          </>
        )}

        <ComboboxInput />
        <ComboboxClearButton />
        <ComboboxArrow />
      </ComboboxTrigger>

      <ComboboxOptions>
        <ComboboxOption label="Option 1" value="1" />
        <ComboboxOption label="Option 2" value="2" />
        <ComboboxOption label="Option 3" value="3" />
      </ComboboxOptions>
    </Combobox>
  );
}
```
