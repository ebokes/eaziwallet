import React from "react";
import { ArrowRightSLine } from "../../common/icons/Icons";

export interface Biller {
  id: string;
  name: string;
  type: string;
  due?: string;
  status?: "paid" | "unpaid";
  dueDate?: string;
  registrationNo?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface BillerItemProps {
  biller: Biller;
  onClick: (biller: Biller) => void;
}

export const BillerItem: React.FC<BillerItemProps> = ({ biller, onClick }) => {
  return (
    <div>
      <button
        onClick={() => onClick(biller)}
        className="w-full flex items-center gap-4 p-4 bg-primary rounded-2xl shadow-sm hover:bg-secondary transition-colors"
      >
        <div
          className={`md:w-12 md:h-12 w-8 h-8 rounded-md ${biller.bgColor} ${biller.textColor} flex items-center justify-center flex-shrink-0`}
        >
          {biller.icon}
        </div>
        <div className="flex-1 text-left">
          <p className="text-B7 md:text-B6 text-primary">{biller.name}</p>
          <p className="text-R7 text-secondary">
            {biller.status === "paid" ? "All paid" : `Due: ${biller.due}`}
          </p>
        </div>
        <ArrowRightSLine className="w-5 h-5 text-primary" />
      </button>
      <hr className="w-full border-light" />
    </div>
  );
};
