import React, { type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  type = "text",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 text-text-primary
            transition-colors duration-200 focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-primary focus:ring-primary/20 hover:border-gray-300"
            }
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
