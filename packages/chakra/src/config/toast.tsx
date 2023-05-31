import { ToastProviderProps } from "@chakra-ui/react";

export const defaultToastOptions: ToastProviderProps = {
  toastSpacing: 16,
  defaultOptions: {
    status: "success",
    variant: "subtle",
    position: "top",
    duration: 5000,
    isClosable: true,
  },
};
