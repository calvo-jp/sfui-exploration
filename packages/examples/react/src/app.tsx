import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { defaultToastOptions, theme } from "@sfui/chakra";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./landing";
import { Layout } from "./layout";
import { User } from "./user";
import { Users } from "./users";

export default function App() {
  return (
    <ChakraProvider
      theme={extendTheme(theme /*, overrides */)}
      toastOptions={defaultToastOptions}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route path="/" element={<Landing />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export const overrides = {
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49",
    },
  },

  components: {
    Input: {
      variants: {
        outline: {
          field: {
            rounded: "8px",
            _focus: {
              borderColor: "primary.500",
            },
          },
        },
      },
    },
  },
};
