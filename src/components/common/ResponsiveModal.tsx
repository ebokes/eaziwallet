import React, { useEffect, type ReactNode } from "react";
import { useUi } from "../../context/UiContext";
import { Button } from "./Button";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | React.ReactNode;
  bold?: boolean;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  bold = true,
}) => {
  const { setIsModalActive } = useUi();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  useEffect(() => {
    if (isOpen) {
      setIsModalActive(true);
      // Focus modal when opened
      modalRef.current?.focus();

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
        setIsModalActive(false);
      };
    } else {
      setIsModalActive(false);
    }
  }, [isOpen, setIsModalActive, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Overlay click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="
        relative w-full md:max-w-md dark:bg-[#181739] bg-primary 
        rounded-t-3xl md:rounded-2xl 
        p-6 shadow-2xl 
        animate-slide-up md:animate-scale-in
        focus:outline-none
      "
      >
        <div className="flex items-center justify-between mb-6">
          <div className=" md:hidden"></div>{" "}
          {title && (
            <h3
              id={titleId}
              className={`${
                bold ? "text-S5" : "R5"
              } font-bold text-primary flex-1 md:text-left md:flex-auto"`}
            >
              {title}
            </h3>
          )}
          <Button
            onClick={onClose}
            variant="ghost"
            size="xs"
            className="p-2 text-celtic-blue text-B6 rounded-full"
            aria-label="Close modal"
          >
            Done
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
};
