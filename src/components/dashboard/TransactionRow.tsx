import React from "react";
import { type Transaction } from "../../constants/constants";
import { ArrowDropRightLine } from "../common/icons/Icons";
import TransactionItem from "../common/Transaction";

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
      className="flex items-center justify-between py-4 hover:bg-primary transition-colors cursor-pointer border-b border-light last:border-0"
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
          <ArrowDropRightLine className="text-primary -ml-1 mb-1" />
        </button>
      </div>
    </div>
  );
};
