import React, { type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ErrorWarningLine, CheckboxCircleLine } from "../icons/Icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success = false,
      fullWidth = true,
      type = "text",
      className = "",
      leftIcon,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine border and background colors based on state
    let borderColor = "border-azureish-white";
    let focusRingColor = "focus:ring-ocean-blue";
    let bgColor = "bg-white";

    if (error) {
      borderColor = "border-golden-gate-bridge";
      focusRingColor = "focus:ring-golden-gate-bridge";
    } else if (success) {
      borderColor = "border-shamrock";
      focusRingColor = "focus:ring-shamrock";
    } else if (props.disabled) {
      borderColor = "border-azureish-white";
      bgColor = "bg-ghost-white";
    }

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label className="block text-R7 text-slate-gray mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`
            w-full px-4 py-3 rounded-md border-2 text-text-primary text-R6 placeholder:text-slate-gray
            transition-colors duration-200 focus:outline-none focus:ring-2
            ${leftIcon ? "pl-10" : ""}
            ${isPassword || error || success ? "pr-10" : ""}
            ${borderColor}
            ${focusRingColor}
            ${bgColor}
            disabled:cursor-not-allowed disabled:text-slate-gray
          `}
            {...props}
          />
          {/* Show error icon */}
          {error && !isPassword && (
            <ErrorWarningLine className="absolute right-3 top-1/2 -translate-y-1/2 text-golden-gate-bridge w-5 h-5" />
          )}
          {/* Show success icon */}
          {success && !error && !isPassword && (
            <CheckboxCircleLine className="absolute right-3 top-1/2 -translate-y-1/2 text-shamrock w-5 h-5" />
          )}
          {/* Show password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-gray hover:text-text-primary focus:outline-none transition-colors"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-R7 text-golden-gate-bridge">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
