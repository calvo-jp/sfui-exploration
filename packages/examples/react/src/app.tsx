import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@scaleforge-ui/chakra";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./landing";
import { Layout } from "./layout";
import { Login } from "./login";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
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
