# SFUI Exploration

Reason for this exploration is due to the problems we've encountered in development while using HDS

## Current HDS problem

- Not themable
- Not flexible
- Bloats html. eg. for a single input, HDS adds 2 html elements
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
    <FormErrorMessage mt={4} color="danger.700">Error</FormErrorMessage> // Also here
  </FormControl>
  ```

- Harder to maintain due to the logic being explicit to particular requirements instead of being flexible (which chakra provides out-of-the-box) to cover most if not all of use-cases

## Proposed Solution

- HDS theme as a library (This eliminates writing redundant global theme like input margin, padding, size, etc)
- Focus on complex components which are not available in chakra rather than abstracting non complex ones (let users abstract it on how they want to abstract it on app-level to match thier reqs)

  These are the components which are in HDS but not in chakra at the time of writing.

  - Select (Custom)
  - MultiSelect
  - Multiline
  - Combobox
  - DatePicker/RangeDatePicker
  - Pagination

- Design new components in a `chakra-ish` way. eg

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

  This way, the user have access to all component parts where they could move parts of the component accordingly to suit their needs. They could also add styles on the fly 😉

- Ensure new components can be themed globally in a chakra way. Refer to [this](https://chakra-ui.com/docs/components/alert/theming)

  New components will also have a default global theme which is based on HDS (overridable of course 👌)

## Development

- clone repo
- cd to folder
- run the command below

```bash
npm install
npm run start:react
```

- Go to http://localhost:4200/users

![screenshot](/docs/screenshot.jpeg)
