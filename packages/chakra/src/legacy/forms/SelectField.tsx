import {
  Spacer,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  size as floatingSize,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useSelect } from "downshift";
import * as React from "react";
import { v4 as uuid } from "uuid";
import FormGroup, { FormGroupProps } from "./FormGroup";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import { Prettify, Size } from "./types";

interface Option {
  label: string;
  value: string | number;
}

type RenderOption<T extends Option> = (item: T) => JSX.Element;

interface SelectFieldBaseProps<T extends Option> {
  name?: string;
  size?: Size;
  value?: T["value"];
  onChange?(newValue: T["value"]): void;
  options?: T[];
  placeholder?: string;
  leftIcon?: JSX.Element;
  renderOption?: RenderOption<T>;
  __fieldTestId?: string;
  __optionTestId?: string | ((item: T) => string);
}

export type SelectFieldProps<T extends Option> = Prettify<
  FormGroupProps & SelectFieldBaseProps<T> & ThemingProps<"Select">
>;

function SelectField<T extends Option>(
  props: SelectFieldProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const styles = useMultiStyleConfig("Select", props);

  const {
    size,
    options = [],
    value,
    onChange,
    leftIcon,
    placeholder,
    zIndex = "modal",
    renderOption = (item) => <chakra.div>{String(item.label)}</chakra.div>,
    __fieldTestId = "hds.select-field.input",
    __optionTestId = "hds.select-field.option",
    ...formGroupProps
  } = props;

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    closeMenu,
    openMenu,
  } = useSelect({
    items: options,
    initialSelectedItem: options.find((o) => o.value === value),
    onSelectedItemChange(changes) {
      if (changes.selectedItem) {
        onChange?.(changes.selectedItem.value);
      }
    },
  });

  const { refs, strategy, x, y } = useFloating({
    open: isOpen,
    onOpenChange(v) {
      if (v) {
        openMenu();
      } else {
        closeMenu();
      }
    },
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
    <FormGroup {...formGroupProps}>
      {({ id, isInvalid, isDisabled, errorId, errorMsg, hintId }) => (
        <>
          <chakra.button
            ref={ref}
            type="button"
            __css={styles.trigger}
            {...(!hintId && {
              "aria-describedby": hintId,
            })}
            {...(isInvalid && {
              "aria-invalid": true,

              ...(errorMsg && {
                "aria-errormessage": errorMsg,
                "aria-describedby": errorId,
              }),
            })}
            {...(isDisabled && {
              disabled: true,
            })}
            {...getToggleButtonProps({
              ref: refs.setReference,
              id,
            })}
            data-testid={__fieldTestId}
          >
            <chakra.span>
              {selectedItem ? selectedItem.label : placeholder}
            </chakra.span>

            <Spacer />

            <chakra.div
              {...(isOpen && { "data-expanded": true })}
              __css={styles.arrow}
            >
              <chakra.svg as={ChevronDownIcon} className="select-arrow-icon" />
            </chakra.div>
          </chakra.button>

          <FloatingPortal>
            <chakra.div
              sx={{
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
              {options.map((item, index) => (
                <chakra.li
                  aria-selected={highlightedIndex === index}
                  __css={styles.option}
                  data-testid={
                    typeof __optionTestId === "function"
                      ? __optionTestId(item)
                      : __optionTestId
                  }
                  {...getItemProps({
                    key: uuid(),
                    item,
                    index,
                  })}
                >
                  {renderOption(item)}
                </chakra.li>
              ))}
            </chakra.div>
          </FloatingPortal>
        </>
      )}
    </FormGroup>
  );
}

export default React.forwardRef(SelectField) as <T extends Option>(
  props: SelectFieldProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
