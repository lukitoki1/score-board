import React, { FC, ReactNode } from 'react';
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  text: string;
  children?: ReactNode;
}

export const CenteredModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  heading,
  text,
  children,
}) => (
  <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay/>
    <ModalContent>
      <ModalCloseButton/>
      <ModalHeader/>
      <ModalBody padding="10">
        <Center flexDirection="column" textAlign="center">
          <Text textStyle="modalHeading" marginBottom="2">
            {heading}
          </Text>
          <Text color="gray.500" marginBottom="7">
            {text}
          </Text>
          {children}
        </Center>
      </ModalBody>
    </ModalContent>
  </Modal>
);