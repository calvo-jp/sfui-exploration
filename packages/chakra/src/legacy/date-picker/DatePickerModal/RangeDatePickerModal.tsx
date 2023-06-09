import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import {
  RangeDatePicker,
  RangeDatePickerProps,
} from "../DatePicker/RangeDatePicker";

export interface RangeDatePickerModalProps extends RangeDatePickerProps {
  children(ctx: UseDisclosureReturn): JSX.Element;
}

export const RangeDatePickerModal = function RangeDatePickerModal({
  children,
  onApply,
  onCancel,
  ...props
}: RangeDatePickerModalProps) {
  const disclosure = useDisclosure();

  return (
    <>
      {children(disclosure)}

      <Modal
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
        blockScrollOnMount
        lockFocusAcrossFrames
      >
        <ModalOverlay />
        <ModalContent
          bgColor="transparent"
          width="auto"
          minWidth="unset"
          maxWidth="unset"
          data-testid="hds.range-datepicker-modal.calendar-container"
        >
          <RangeDatePicker
            onApply={(newValue) => {
              onApply?.(newValue);
              disclosure.onClose();
            }}
            onCancel={(currentValue) => {
              onCancel?.(currentValue);
              disclosure.onClose();
            }}
            {...props}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
