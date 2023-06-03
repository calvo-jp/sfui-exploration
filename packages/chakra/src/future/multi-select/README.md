# MultiSelect

## Usage

```tsx
function Component() {
  return (
    <MultiSelect>
      {({ selectedOptions, remove }) => (
        <>
          <MultiSelectControl>
            {selectedOptions.map((selectedOption) => (
              <Tag key={selectedOption.value}>
                <TagLabel>
                  {selectedOption.label}
                </TagLabel>

                <TagCloseButton onClick={remove} />
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
