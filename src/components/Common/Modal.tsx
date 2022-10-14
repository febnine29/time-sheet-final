import {
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";
export interface ModalProps {
  title: string;
  component: JSX.Element;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function Modal({
  title,
  component,
  isOpen,
  onOpen,
  onClose,
}: ModalProps) {
  return (
    <ModalChakra size="xl" closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} motionPreset='none'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{component}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
}
