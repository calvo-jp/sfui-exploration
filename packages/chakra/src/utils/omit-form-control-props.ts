import { UseFormControlProps } from "@chakra-ui/react";

const keys: (keyof UseFormControlProps<any>)[] = [
  "aria-describedby",
  "disabled",
  "id",
  "isDisabled",
  "isInvalid",
  "isReadOnly",
  "isRequired",
  "onBlur",
  "onFocus",
  "readOnly",
  "required",
];

export function omitFormControlProps<
  C extends HTMLElement,
  T extends UseFormControlProps<C>,
>(props: T) {
  const copy: Record<string, any> = { ...props };

  for (const key of keys) {
    if (key in copy) {
      delete copy[key];
    }
  }

  return copy as Omit<T, keyof UseFormControlProps<C>>;
}
