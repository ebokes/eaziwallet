import React, { type ReactNode } from "react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div
        className="
        relative w-full md:max-w-md bg-white 
        rounded-t-3xl md:rounded-2xl 
        p-6 shadow-2xl 
        animate-slide-up md:animate-scale-in
      "
      >
        <div className="flex items-center justify-between mb-6">
          <div className=" md:hidden"></div>{" "}
          {title && (
            <h3 className={`text-xl ${bold ? "font-bold" : "font-normal"} font-bold text-text-primary flex-1 md:text-left md:flex-auto"`}>
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="p-2 text-celtic-blue font-medium hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            Done
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
