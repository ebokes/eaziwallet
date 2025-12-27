import React from "react";

interface PasswordStrengthProps {
  password?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password = "",
}) => {
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return 0;

    // +1 for length >= 8
    if (pwd.length >= 8) score++;
    // +1 for mixed case
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    // +1 for numbers
    if (/\d/.test(pwd)) score++;
    // +1 for special characters
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return score;
  };

  const strength = calculateStrength(password);

  const getLabel = (score: number) => {
    if (!password) return "";
    switch (score) {
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  const getColorClass = (score: number, index: number) => {
    if (index >= score) return "bg-gray-200";

    switch (score) {
      case 1:
        return "bg-golden-gate-bridge"; // Red-ish
      case 2:
        return "bg-orange-400";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-shamrock"; // Green
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${getColorClass(
              strength,
              index
            )}`}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs font-medium text-secondary">
          Password Strength:{" "}
          <span className="text-primary">{getLabel(strength)}</span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
