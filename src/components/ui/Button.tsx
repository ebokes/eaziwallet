import React, { type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "accent"
    | "secondary"
    | "tertiary"
    | "tertiary-warning"
    | "tertiary-action"
    | "filters"
    | "ghost";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  size?: "xs" | "sm" | "md" | "lg";
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
  to,
  size = "lg",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-B6 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: "bg-majorelle-blue text-[#fff] hover:bg-majorelle-blue/90",
    accent: "bg-mango text-indigo hover:bg-mango/85",
    secondary:
      "border border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue/20",
    tertiary: "text-ocean-blue",
    "tertiary-warning": "text-golden-gate-bridge",
    "tertiary-action": "text-celtic-blue",
    filters:
      "border border-azureish-white text-primary bg-primary hover:bg-azureish-white/5",
    ghost: "px-0 text-regular",
  };

  const sizeStyles = {
    xs: "px-0 py-0 text-base",
    sm: "px-2 py-2 text-base",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3.5 text-base",
  };

  return to ? (
    <Link
      to={to}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${size ? sizeStyles[size] : ""}
        ${fullWidth ? "w-full" : ""}
        ${isLoading ? "cursor-wait" : ""}
        ${disabled || isLoading ? "pointer-events-none opacity-50" : ""}
        ${className}
      `}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Link>
  ) : (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${size ? sizeStyles[size] : ""}
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
