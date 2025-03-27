'use client';

import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  openButton?: React.ReactElement<ButtonProps>;
  modalProps?: Omit<ModalProps, 'children'>;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideFooter?: boolean;
  isIntercepted?: boolean;
};
export default function ModalWrapper({
  openButton,
  header,
  modalProps,
  children,
  footer,
  hideFooter,
  isIntercepted = true,
}: Props) {
  const { back } = useRouter();
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {openButton
        ? React.cloneElement(openButton, {
            onPress: onOpenChange,
          })
        : null}
      <Modal
        isOpen={isOpen || !openButton}
        onOpenChange={onOpenChange}
        onClose={isIntercepted ? back : onOpenChange}
        {...modalProps}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {header}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              {!hideFooter ? null : (
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
