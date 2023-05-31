import {
  ToastProviderProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { Pretty } from "../types";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SpinnerIcon,
  XMarkIcon,
} from "./icons";

type D = NonNullable<ToastProviderProps["defaultOptions"]>;
type R = NonNullable<D["render"]>;
type P = Parameters<R>[0];

export type ToastProps = Pretty<P>;

export function Toast(props: ToastProps) {
  const {
    size,
    title,
    description,
    status = "success",
    variant = "subtle",
    isClosable = true,
    onClose,
    styleConfig,
    orientation,
    ...others
  } = props;

  const colorScheme = others.colorScheme ?? statusToColorScheme(status);

  const styles = useMultiStyleConfig("Toast", {
    size,
    variant,
    colorScheme,
    orientation,
    styleConfig,
  });

  return (
    <chakra.div role="alert" __css={styles.container}>
      <chakra.svg as={getIcon(status)} __css={styles.icon} />

      <chakra.div __css={styles.content}>
        {title && <chakra.div __css={styles.title}>{title}</chakra.div>}

        {description && (
          <chakra.div __css={styles.description}>{description}</chakra.div>
        )}
      </chakra.div>

      {isClosable && (
        <chakra.button
          type="button"
          role="button"
          aria-label="Close alert"
          onClick={onClose}
          __css={styles.closeButton}
        >
          <chakra.svg as={XMarkIcon} className="chakra-toast__svg" />
        </chakra.button>
      )}
    </chakra.div>
  );
}

function statusToColorScheme(key: ToastProps["status"]) {
  switch (key) {
    case "info":
      return "blue";
    case "error":
      return "error";
    case "loading":
      return "neutral";
    case "success":
      return "success";
    case "warning":
      return "warning";
  }
}

function getIcon(key: ToastProps["status"]) {
  switch (key) {
    case "error":
      return ExclamationCircleIcon;
    case "info":
      return InformationCircleIcon;
    case "warning":
      return ExclamationTriangleIcon;
    case "success":
      return CheckCircleIcon;
    case "loading":
      return SpinnerIcon;
    default:
      return;
  }
}
