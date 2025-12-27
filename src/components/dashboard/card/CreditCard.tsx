import React from "react";

interface CreditCardProps {
  img?: string;
  onClick?: () => void;
  // Other props made optional to avoid errors if passed via spread
  name?: string;
  cardNumber?: string;
  expiry?: string;
  balance?: string;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
}

export const CreditCard: React.FC<CreditCardProps> = ({ img, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative w-full aspect-[1.586/1] rounded-3xl p-6 text-white shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]
      
      `}
    >
      {img && (
        <img
          src={img}
          className="absolute top-0 left-0 w-full h-full object-contain"
          alt=""
        />
      )}
    </div>
  );
};
