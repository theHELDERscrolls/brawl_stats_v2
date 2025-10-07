import { BasicTag } from "../BasicTag";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  withBackdrop?: boolean;
  withCloseButton?: boolean;
  centered?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  withBackdrop = false,
  withCloseButton = false,
  centered = false,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.querySelector("#modal");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 ${withBackdrop ? "bg-neutral-950/50 backdrop-blur-xs" : ""} ${
        centered ? "flex items-center justify-center p-4" : ""
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-w-3xl max-h-[48rem]"
      >
        {withCloseButton && (
          <BasicTag
            iconId="icon-cross"
            size={32}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-0 z-50 cursor-pointer top-1 sm:top-4 sm:right-4 text-neutral-100 drop-shadow-xs drop-shadow-neutral-950"
          />
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};
