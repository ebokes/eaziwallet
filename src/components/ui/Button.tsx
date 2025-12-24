import React, { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "accent"
    | "secondary"
    | "tertiary"
    | "tertiary-warning"
    | "tertiary-action"
    | "filters";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-majorelle-blue text-[#fff] hover:bg-majorelle-blue/90",
    accent: "bg-mango text-indigo hover:bg-mango/85",
    secondary:
      "border border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue/20",
    tertiary: "text-ocean-blue",
    "tertiary-warning": "text-golden-gate-bridge",
    "tertiary-action": "text-celtic-blue",
    filters:
      "border-2 border-azureish-white text-primary hover:bg-azureish-white/5",
  };

  const sizes = "px-6 py-3.5 text-base";

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes}
        ${fullWidth ? "w-full" : ""}
        ${isLoading ? "cursor-wait" : ""}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
