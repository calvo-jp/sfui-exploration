import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@scaleforge-ui/chakra";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./landing";
import { Layout } from "./layout";
import { Login } from "./login";

export default function App() {
  return (
    <ChakraProvider
      theme={extendTheme(theme, {
        /*
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
        */
      })}
      toastOptions={{
        defaultOptions: {
          status: "success",
          variant: "subtle",
          position: "top",
          duration: 5000,
          isClosable: true,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route path="/" element={<Landing />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
