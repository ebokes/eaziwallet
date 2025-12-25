import { ChevronRight } from "lucide-react";
import React from "react";
import { type Transaction as TransactionType } from "../../../lib/constants";
import TransactionItem from "../../ui/Transaction";

interface TransactionListProps {
  transactions: TransactionType[];
  onTransactionClick: (transaction: TransactionType) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionClick,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-text-secondary">
        No transactions found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-0">
        {transactions.map((t) => (
          <div
            key={t.id}
            onClick={() => onTransactionClick(t)}
            className="flex items-center justify-between py-4 hover:bg-gray-50/50 transition-colors cursor-pointer border-b border-alice-blue last:border-0"
          >
            <TransactionItem transaction={t} />
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-bold ${
                  t.type === "received" ? "text-shamrock" : "text-jelly-bean"
                }`}
              >
                {t.type === "received" ? "+" : "-"}${t.amount.toFixed(2)}
              </span>
              <button>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
