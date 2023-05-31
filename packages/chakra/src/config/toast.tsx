import { ToastProviderProps } from "@chakra-ui/react";
import { Toast } from "../Toast";

export const defaultToastOptions: ToastProviderProps = {
  defaultOptions: {
    status: "success",
    variant: "subtle",
    position: "top",
    duration: 5000,
    isClosable: true,
    render: Toast,
  },
};
