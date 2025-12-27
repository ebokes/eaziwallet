import React from "react";
import { Wifi } from "lucide-react";

interface CreditCardProps {
  name: string;
  cardNumber: string;
  expiry: string;
  balance?: string;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  onClick?: () => void;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  name,
  cardNumber,
  expiry,
  balance,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const getGradient = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-br from-[#5C33CF] to-[#2D0C57]";
      case "secondary":
        return "bg-gradient-to-br from-[#FF9C35] to-[#FF5F35]";
      case "dark":
        return "bg-la-salle-green";
      default:
        return "bg-gradient-to-br from-[#5C33CF] to-[#2D0C57]";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full aspect-[1.586/1] rounded-3xl p-6 text-white shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]
        ${getGradient()}
        ${className}
      `}
    >
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-xl"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-white/70 mb-1">Card Holder</p>
            <p className="font-semibold tracking-wide">{name}</p>
          </div>
          <Wifi className="rotate-90" size={24} />
        </div>

        {/* Middle Row (Chip) */}
        <div className="w-12 h-9 bg-yellow-400/20 rounded-md border border-yellow-400/40 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 border-t border-b border-yellow-400/20 top-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 border-l border-r border-yellow-400/20 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Bottom Row */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <p className="text-xl font-mono tracking-widest">
              •••• •••• •••• {cardNumber.slice(-4)}
            </p>
          </div>

          <div className="flex justify-between items-end">
            {balance && (
              <div>
                <p className="text-xs text-white/70">Balance</p>
                <p className="text-xl font-bold">${balance}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-white/70 text-right">Expires</p>
              <p className="font-mono">{expiry}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
