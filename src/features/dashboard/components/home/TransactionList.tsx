import React from "react";
import { type Transaction as TransactionType } from "../../lib/constants";
import { TransactionRow } from "../TransactionRow";

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
      <div className="px-6 py-10 text-center text-secondary">
        No transactions found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-0">
        {transactions.map((t) => (
          <TransactionRow
            key={t.id}
            transaction={t}
            onClick={onTransactionClick}
          />
        ))}
      </div>
    </div>
  );
};
