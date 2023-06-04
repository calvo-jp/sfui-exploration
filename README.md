# SFUI Exploration

Reason for this exploration is due to the problems we've encountered in development while using HDS

## Current HDS problem

- Not themable
- Not flexible eg. having an input with floating label is impossible or atleast requires HUGE effort to be accomplished
- Bloats html. eg. for a single input, HDS adds atleast 3 html elements

  Let's says I just want to use an input and input alone. HDS imports all these components

  ```
  Input
  InputGroup
  InputLeftElement
  InputRightElement
  FormControl
  FormLabel
  FormErrorMessage
  FormHelperText
  ```

  This ends up to a larger bundle size for a particular page which just needs an `<Input>`

- Can't add styles on the fly. eg:

  In HDS, You do this

  ```tsx
  <InputField
    label="Label" /* no way to style this label here  */
    error="Error" /* same here */
  />
  ```

  In Chakra, you have access to all parts of a component

  ```tsx
  <FormControl>
    <FormLabel mb={2} color="blue.600">Label<FormLabel> // On the fly styles here
    <Input />
    <FormErrorMessage mt={4} color="danger.700">Error</FormErrorMessage> // Also here
  </FormControl>
  ```

- Harder to maintain due to the logic being tied to specific requirements instead of having the flexibility to cover most if not all use-cases (like what chakra does)

## Proposed Solution

- HDS theme as chakra's default theme

  This eliminates writing redundant global theme like input margin, padding, size, etc and
  at the same time remains overrideable like so

  ```tsx
  import { theme as HdsTheme } from "hds/chakra";
  import { theme as ThemeOverrides } from "./theme";

  function App() {
    return (
      <ChakraProvider theme={extendTheme(HdsTheme, ThemeOverrides)}>
        ...
      </ChakraProvider>
    );
  }
  ```

- Focus on complex components which are not available in chakra rather than abstracting non-complex ones. eg

  - `Select (Custom)`
  - `MultiSelect`
  - `Multiline`
  - `Combobox`
  - `Pagination`
  - `DatePicker`
  - `RangeDatePicker`

- Redesign custom components where user have access to most if not all parts of the component. eg for Select

  ```tsx
  function Component() {
    return (
      <Select>
        {({ selectedOption }) => (
          <>
            <SelectTrigger>
              {selectedOption.label ?? "Select option"}
            </SelectTrigger>

            <SelectOptions p={4} /* 👈 custom on-the-fly styling */>
              <SelectOption label="Option 1" value="1" />
              <SelectOption label="Option 2" value="2" />
              <SelectOption label="Option 3" value="3">
                <Box>
                  <Text>I Can customize this</Text> /* 👈 custom render */
                </Box>
              </SelectOption>
            </SelectOptions>
          </>
        )}
      </Select>
    );
  }
  ```

  This way, the user can add direct styling to part of the component without having to go thru global theming which will affect everything. In some cases they can also remove what they don't need to match thier reqs. They could also abstract it (but they don't have to).

- Ensure new components can be themed globally

  New components will come with a default global theme which is of based on HDS and can be overridden either on-the-fly or globally

  eg. for a pagination component global theme would be something like this

  ```ts
  export const Pagination: MultiStyleConfig = {
    parts: ["container" /* other parts */],
    baseStyle: {
      container: {
        p: 4,
        bg: "gray.50",
      },
    },

    /* ... */
  };
  ```

## Why Chakra?

Up until today, `emotion` (which chakra uses as part of thier styled system) is still the best option that we have. Thier still a huge gap between new libraries like `vanilla-extract/css` in terms of feature that will speed up development. Apart from that, after seeing [this](https://www.adebayosegun.com/blog/the-future-of-chakra-ui) article made by the author of chakra, I feel like we're going to be stuck with chakra for a very long time. Here are some best things that is coming in chakra versions **3** and **4**

- dropping of `framer-motion` (which has the biggest bundle size) in favor of css (v3)
- migrating from `popper` to `floating-ui` (v3)

  See https://floating-ui.com/

- **pandas**

  Zero runtime CSS-in-JS. Just like `tailwind`'s **JIT** compiler, it also uses `postcss` to generate css files at build time

- **ark-ui**

  unstyled components which also comes with complex components like datepicker, colorpicker, combobox, etc.

- **@zag-js**

  low-level library for handling components logic. framework-agnostic

While these components are not yet available in current chakra version `(2.*)`, we'll create them

## Development

- clone repo
- cd to folder
- run the command below

```bash
npm install
npm run start:react
```

- Go to http://localhost:4200/users

![screenshot](/media/screenshot.jpeg)
