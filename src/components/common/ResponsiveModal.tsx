import React, { useEffect, type ReactNode } from "react";
import { useUi } from "../../context/UiContext";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

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

  // Handle variants for responsive animation
  const isMobile = window.innerWidth < 768;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: isMobile
      ? { y: "100%", opacity: 0 }
      : { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      } as const,
    },
    exit: isMobile
      ? { y: "100%", opacity: 0 }
      : { scale: 0.9, opacity: 0, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              relative w-full md:max-w-md dark:bg-[#181739] bg-primary 
              rounded-t-3xl md:rounded-2xl 
              p-6 shadow-2xl 
              focus:outline-none pointer-events-auto
            "
          >
            <div className="flex items-center justify-between mb-6">
              <div className="md:hidden"></div>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
