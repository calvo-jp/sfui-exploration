# SFUI Exploration

Reason for this exploration is due to the problems we've encountered when using HDS

## Current HDS problem

- Not themable
- Not flexible
- Can't add styles on the fly. eg:

  In HDS we do this

  ```tsx
  <InputField label="" error="" />
  ```

  In Chakra you could do this

  ```tsx
  <FormControl>
    <FormLabel mb={2} color="blue.600">label<FormLabel> // On the fly styles
    <Input />
    <FormErrorMessage mt={4} color="dange.700">Error</FormErrorMessage> // Also here
  </FormControl>
  ```

- Hard to maintain due to supporting explicit requirements instead of being flexible (which chakra provides out-of-the-box) to cater most if not all of use-cases

## Solution

- Chakra which has a default HDS theme (This eliminates writing redundant global theme like input margin, padding, size, etc)
- Focus on complex components which are not available in chakra currently rather than abstracting non complex ones (let users abstract it on app-level based on thier requirements like what they used to do)
- Design complex components in a `chakra-ish` way. eg

  ```tsx
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
  ```

- Ensure new components can be themed globally in a chakra way. Refer to [this](https://chakra-ui.com/docs/components/alert/theming)

## Development

- clone repo
- cd to folder
- run the command below

```bash
npm install
npm run start:react
```
