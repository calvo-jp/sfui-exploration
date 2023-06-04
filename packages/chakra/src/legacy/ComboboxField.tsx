import { chakra, ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  size as floatingSize,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useCombobox } from "downshift";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Nullable, Pretty } from "../types";
import FormGroup, { FormGroupProps } from "./FormGroup";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import CloseIcon from "./icons/CloseIcon";

interface Option {
  label: string;
  value: string | number;
}

type RenderOption<T extends Option> = (item: T) => JSX.Element;

type ComboboxBaseProps<T extends Option> = {
  name?: string;
  value?: Nullable<T["value"]>;
  options?: T[];
  onChange?(newValue: Nullable<T["value"]>): void;
  leftIcon?: JSX.Element;
  placeholder?: string;
  autoFocus?: boolean;
  isClearable?: boolean;
  blurOnSelect?: boolean;

  /**
   *
   * Adjust zIndex of menu
   * @default 1
   *
   */
  zIndex?: number;

  /**
   *
   * Pass a custom matcher function.
   * By default, we compare label to search
   *
   */
  matcher?(search: string, item: T): boolean;
  renderOption?: RenderOption<T>;

  __fieldTestId?: string;
  __clearBtnTestId?: string;
  __optionTestId?: string | ((item: T) => string);
};

export type ComboboxFieldProps<T extends Option> = Pretty<
  ComboboxBaseProps<T> & FormGroupProps & ThemingProps<"Combobox">
>;

/*
 * TODO: implement "isReadOnly"
 */
function ComboboxField<T extends Option>(
  props: ComboboxFieldProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const styles = useMultiStyleConfig("Combobox", props);

  const {
    size,
    name,
    value,
    onChange,
    placeholder,
    autoFocus,
    options = [],
    matcher = (s, i) => i.label.toLowerCase().includes(s.toLowerCase()),
    renderOption = (i) => i.label,
    leftIcon,
    isClearable,
    blurOnSelect,
    zIndex = "modal",

    __fieldTestId = "hds.combobox.controls.input",
    __clearBtnTestId = "hds.combobox.controls.clear",
    __optionTestId = "hds.combobox.options.option",

    ...others
  } = props;

  const [filteredOptions, setFilteredOptions] = React.useState(() => {
    const defaultSearch = options.find((o) => o.value === value);

    if (!defaultSearch) return options;

    return options.filter((o) => {
      if (!value) return true;
      return matcher(defaultSearch.label, o);
    });
  });

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    selectedItem,
    setInputValue,
    selectItem,
    openMenu,
  } = useCombobox({
    items: filteredOptions,
    initialInputValue: options.find((o) => o.value === value)?.label ?? "",
    initialSelectedItem: options.find((o) => o.value === value),
    itemToString(item) {
      return item?.label ?? "";
    },
    onInputValueChange({ inputValue = "" }) {
      setFilteredOptions(
        options.filter((option) => matcher(inputValue, option)),
      );
    },
    onSelectedItemChange({ selectedItem }) {
      onChange?.(selectedItem?.value ?? null);
    },
  });

  const { refs, strategy, x, y } = useFloating({
    open: isOpen,
    strategy: "fixed",
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({
        padding: 6,
      }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  return (
    <FormGroup {...others}>
      {({ id, isInvalid, isDisabled }) => (
        <>
          <chakra.div
            ref={refs.setReference}
            data-testid="hds.combobox"
            __css={{
              ...styles.control,
              "& .HdsComboboxClearButton": {
                display: "none",
              },
              _hover: {
                "& .HdsComboboxClearButton": {
                  display: "flex",
                },
              },
            }}
          >
            <chakra.input
              {...(isInvalid && {
                "aria-invalid": true,
              })}
              {...(isDisabled && {
                disabled: true,
              })}
              {...getInputProps({
                id,
                ref,
                name,
                placeholder,
              })}
              __css={styles.input}
              data-testid={__fieldTestId}
            />

            {!!isClearable && !!selectedItem && !isDisabled && (
              <chakra.button
                type="button"
                className="HdsComboboxClearButton"
                onClick={() => {
                  setInputValue("");
                  selectItem(null);
                  openMenu();
                }}
                sx={styles.clear}
                data-testid={__clearBtnTestId}
              >
                <chakra.svg as={CloseIcon} className="combobox-clear-icon" />
              </chakra.button>
            )}

            <chakra.button
              type="button"
              __css={styles.arrow}
              {...getToggleButtonProps({
                disabled: isDisabled,
              })}
              data-testid="hds.combobox.controls.toggle"
            >
              <chakra.svg
                as={ChevronDownIcon}
                className="combobox-arrow-icon"
              />
            </chakra.button>
          </chakra.div>

          <FloatingPortal>
            <chakra.div
              __css={{
                pos: strategy,
                top: `${y}px`,
                left: `${x}px`,
                zIndex,
                ...styles.options,
                ...(!isOpen && {
                  display: "none",
                }),
              }}
              {...getMenuProps(
                { ref: refs.setFloating },
                { suppressRefError: true },
              )}
            >
              {filteredOptions.map((item, index) => {
                return (
                  <chakra.div
                    {...getItemProps({
                      key: uuid(),
                      item,
                      index,
                    })}
                    __css={styles.option}
                    data-testid={
                      typeof __optionTestId === "function"
                        ? __optionTestId(item)
                        : __optionTestId
                    }
                  >
                    {renderOption(item)}
                  </chakra.div>
                );
              })}

              {!filteredOptions.length && (
                <chakra.div
                  __css={styles.option}
                  data-testid="hds.combobox.nomatchfound"
                >
                  No match found
                </chakra.div>
              )}
            </chakra.div>
          </FloatingPortal>
        </>
      )}
    </FormGroup>
  );
}

export default React.forwardRef(ComboboxField) as <T extends Option>(
  props: ComboboxFieldProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> },
) => JSX.Element;
