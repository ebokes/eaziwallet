import { ChevronRight } from "lucide-react";
import React from "react";
import { type Transaction } from "../../../lib/constants";
import TransactionItem from "../../ui/Transaction";

interface TransactionRowProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(transaction)}
      className="flex items-center justify-between py-4 hover:bg-gray-50/50 transition-colors cursor-pointer border-b border-alice-blue last:border-0"
    >
      <TransactionItem transaction={transaction} />
      <div className="flex items-center gap-1">
        <span
          className={`text-R7 md:text-R6 ${
            transaction.type === "received"
              ? "text-shamrock"
              : "text-jelly-bean"
          }`}
        >
          {transaction.type === "received" ? "+" : "-"}$
          {transaction.amount.toFixed(2)}
        </span>
        <button>
          <ChevronRight size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};
