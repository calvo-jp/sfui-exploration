import { UseFormControlProps } from "@chakra-ui/react";

type FormControlPropsKey = keyof UseFormControlProps<any>;

const keys: FormControlPropsKey[] = [
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
>(props: T, whitelist: FormControlPropsKey[] = []) {
  const copy: Record<string, any> = { ...props };

  for (const key of keys) {
    if (!whitelist.includes(key) && key in copy) {
      delete copy[key];
    }
  }

  return copy as Omit<T, keyof UseFormControlProps<C>>;
}
