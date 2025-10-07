import { useState } from "react";
import { Modal } from "./Modal";
import { ModalContext } from "./ModalContext";

interface ModalOptions {
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  centered?: boolean;
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});

  const openModal = (content: React.ReactNode, options: ModalOptions = {}) => {
    setModalContent(content);
    setModalOptions(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalOptions({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        withBackdrop={modalOptions.withBackdrop}
        withCloseButton={modalOptions.withCloseButton}
        centered={modalOptions.centered}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
