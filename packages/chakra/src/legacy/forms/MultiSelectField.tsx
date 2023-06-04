import {
  Tag,
  TagCloseButton,
  TagLabel,
  ThemingProps,
  chakra,
  useControllableState,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  size as floatingSize,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  ForwardedRef,
  Fragment,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { FloatingUiPortalId } from "../../constants";
import { Merge } from "../../types";
import { invariant } from "../../utils";
import FormGroup, { FormGroupProps } from "./FormGroup";
import CheckIcon from "./icons/CheckIcon";
import CloseIcon from "./icons/CloseIcon";

interface Option<T extends string | number> {
  label: string;
  value: T;
}

interface RenderValueContext {
  onClose(): void;
}

interface RenderOptionContext {
  index: number;
  isSelected: boolean;
  isHighlighted: boolean;
}

export interface MultiSelectFieldProps<T extends string | number>
  extends Merge<
    FormGroupProps & ThemingProps<"MultiSelect">,
    {
      name?: string;
      placeholder?: string;
      value?: Option<T>["value"][];
      options?: Option<T>[];
      onChange?(newValue: Option<T>["value"][]): void;
      renderValue?(option: Option<T>, context: RenderValueContext): ReactNode;
      renderOption?(option: Option<T>, context: RenderOptionContext): ReactNode;
      __fieldTestId?: string;
      __valueTestId?: string | ((option: Option<T>) => string);
      __optionTestId?: string | ((option: Option<T>) => string);
    }
  > {}

const MultiSelectFieldInternal = function MultiSelectFieldInternal<
  T extends string | number,
>(
  {
    name,
    zIndex = "modal",
    placeholder,
    value,
    onChange,
    options = [],
    renderValue,
    renderOption,
    __fieldTestId = "hds.multi-select.field",
    __valueTestId = "hds.multi-select.value",
    __optionTestId = "hds.multi-select.option",
    ...others
  }: MultiSelectFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const styles = useMultiStyleConfig("MultiSelect", others);

  const [$$value, $$onChange] = useControllableState({
    value,
    onChange,
    defaultValue: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputMergedRef = useMergeRefs([ref, inputRef]);

  const { refs, x, y, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
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

  const dismiss = useDismiss(context);
  const focus = useFocus(context);
  const click = useClick(context, {
    keyboardHandlers: false,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const listRef = useRef<HTMLElement[]>([]);
  const listNavigation = useListNavigation(context, {
    listRef,
    loop: true,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
  });

  const transition = useTransitionStyles(context);
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, focus, dismiss, listNavigation],
  );

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
  }, [inputValue, options]);

  useEffect(() => {
    return () => {
      setIsOpen(false);
      setActiveIndex(null);
      setInputValue("");
    };
  }, []);

  return (
    <>
      <FormGroup {...others}>
        {({ id, errorId, errorMsg, isDisabled, isReadOnly, hintId }) => (
          <chakra.div
            ref={refs.setReference}
            {...(isOpen && {
              "data-opened": true,
            })}
            {...(errorMsg && {
              "data-invalid": true,
            })}
            {...(isDisabled && {
              "data-disabled": true,
            })}
            {...(isOpen && {
              "aria-expanded": true,
            })}
            {...getReferenceProps({
              onClick() {
                inputRef.current?.focus();
              },
            })}
            __css={styles.container}
            data-testid="hds.multi-select.container"
          >
            {$$value.map((v, _, arr) => {
              const option = options.find((o) => o.value === v);

              invariant(option);

              const onClose = () => {
                $$onChange(arr.filter((i) => i !== option.value));
                inputRef.current?.focus();
              };

              if (renderValue) {
                return (
                  <Fragment key={uuid()}>
                    {renderValue(option, {
                      onClose,
                    })}
                  </Fragment>
                );
              }

              return (
                <Tag
                  key={uuid()}
                  data-testid={
                    typeof __valueTestId === "function"
                      ? __valueTestId(option)
                      : __valueTestId
                  }
                >
                  <TagLabel>{option.label}</TagLabel>
                  <TagCloseButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      onClose();
                    }}
                    data-testid="hds.multi-select.control.unselect-value"
                  >
                    <chakra.svg as={CloseIcon} w={3} h={3} />
                  </TagCloseButton>
                </Tag>
              );
            })}

            <chakra.input
              id={id}
              ref={inputMergedRef}
              name={name}
              placeholder={placeholder}
              disabled={isDisabled}
              readOnly={isReadOnly}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  activeIndex != null &&
                  filteredOptions[activeIndex]
                ) {
                  const option = filteredOptions[activeIndex];

                  setActiveIndex(null);

                  const isSelected = $$value.some(
                    (optionValue) => optionValue === option.value,
                  );

                  const newValue = isSelected
                    ? $$value.filter(
                        (optionValue) => optionValue !== option.value,
                      )
                    : [...$$value, option.value];

                  $$onChange(newValue);
                }
              }}
              {...{
                "data-testid": __fieldTestId,
                "aria-describedby": hintId,

                ...(errorMsg && {
                  "aria-invalid": true,
                  "aria-describedby": errorId,
                  "aria-errormessage": errorMsg,
                }),
              }}
              __css={styles.input}
            />
          </chakra.div>
        )}
      </FormGroup>

      {transition.isMounted && (
        <FloatingPortal id={FloatingUiPortalId}>
          <FloatingFocusManager context={context} initialFocus={-1}>
            <chakra.div
              ref={refs.setFloating}
              __css={{
                pos: strategy,
                top: `${y}px`,
                left: `${x}px`,
                zIndex,
                ...transition.styles,
                ...styles.options,
              }}
              {...getFloatingProps()}
              data-testid="hds.multi-select.menu-wrapper"
            >
              {filteredOptions.map((option, index) => {
                const isSelected = $$value.some((v) => v === option.value);
                /*
                const isHighlighted = activeIndex === index;
                */

                return (
                  <chakra.div
                    key={uuid()}
                    tabIndex={0}
                    ref={(node) => {
                      if (node) {
                        listRef.current[index] = node;
                      }
                    }}
                    {...getItemProps({
                      onClick(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        const newValue = isSelected
                          ? $$value.filter((o) => o !== option.value)
                          : [...$$value, option.value];

                        $$onChange(newValue);
                        inputRef.current?.focus();
                        setIsOpen(false);
                      },
                    })}
                    __css={styles.option}
                    data-testid={
                      typeof __optionTestId === "function"
                        ? __optionTestId(option)
                        : __optionTestId
                    }
                  >
                    <chakra.span flexGrow={1}>{option.label}</chakra.span>

                    {isSelected && (
                      <chakra.svg
                        as={CheckIcon}
                        w={4}
                        h={4}
                        color="success.700"
                        className="multiselect-check-icon"
                      />
                    )}
                  </chakra.div>
                );
              })}

              {filteredOptions.length === 0 && (
                <chakra.div __css={styles.menuitem}>No match found</chakra.div>
              )}
            </chakra.div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default forwardRef(MultiSelectFieldInternal) as <
  T extends string | number,
>(
  props: MultiSelectFieldProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
) => JSX.Element;
