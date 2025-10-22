import { createContext } from "react";

interface ModalOptions {
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  centered?: boolean;
}

interface ModalContextProps {
  openModal: (content: React.ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);
