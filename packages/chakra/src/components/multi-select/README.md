# MultiSelect

## Usage

```tsx
function Component() {
  return (
    <MultiSelect>
      {({ selectedOptions }) => (
        <>
          <MultiSelectControl>
            {selectedOptions.map((selectedOption) => (
              <MultiSelectTag key={selectedOption.value}>
                <MultiSelectTagLabel>
                  {selectedOption.label}
                </MultiSelectTagLabel>

                <MultiSelectTagCloseButton />
              </MultiSelectTag>
            ))}

            <MultiSelectInput />
            <MultiSelectArrow />
          </MultiSelectControl>

          <MultiSelectOptions>
            <MultiSelectOption label="Option 1" value="1" />
            <MultiSelectOption label="Option 2" value="2" />
            <MultiSelectOption label="Option 3" value="3" />
          </MultiSelectOptions>
        </>
      )}
    </MultiSelect>
  );
}
```
