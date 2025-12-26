import React, {
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { CheckCircle2 } from "lucide-react";
import { CheckboxCircleLine } from "../icons/Icons";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize focus
  useEffect(() => {
    if (inputRefs.current[0] && value.length === 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value;
    if (isNaN(Number(char))) return;

    // Get the last character entered
    const singleChar = char.substring(char.length - 1);

    // Construct new OTP string
    const currentOtp = value.padEnd(length, " ").split("");
    currentOtp[index] = singleChar;
    const newOtp = currentOtp.join("").trim();

    onChange(newOtp);

    // Move focus
    if (singleChar && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // Move back if current is empty
        inputRefs.current[index - 1]?.focus();
        // Also clear previous if we just moved back
        const currentOtp = value.padEnd(length, " ").split("");
        currentOtp[index - 1] = " "; // temporary placeholder
        onChange(currentOtp.join("").trim());
      } else {
        // Clear current
        const currentOtp = value.padEnd(length, " ").split("");
        currentOtp[index] = " ";
        onChange(currentOtp.join("").trim());
      }
    }

    // Allow navigation
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  // Check if fully complete for success state
  const isComplete = value.length === length;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        {/* First Group of 3 */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-6 h-12 text-center text-R1 bg-transparent outline-none p-0 text-text-primary placeholder:text-gray-300"
              placeholder="X"
            />
          ))}
        </div>

        {/* Separator */}
        <span className="text-3xl text-gray-300 mx-1">-</span>

        {/* Second Group of 3 */}
        <div className="flex gap-2">
          {[3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-6 h-12 text-center text-R1 bg-transparent outline-none p-0 text-text-primary placeholder:text-gray-300"
              placeholder="X"
            />
          ))}
        </div>

        {/* Success Icon */}
        {isComplete && (
          <div className="absolute -right-8">
            <CheckboxCircleLine className="text-shamrock" />
          </div>
        )}
      </div>

      {/* Underline */}
      <div
        className={`mt-2 w-full h-0.5 transition-colors ${
          isComplete ? "bg-shamrock" : "bg-ocean-blue"
        }`}
      />
    </div>
  );
};
