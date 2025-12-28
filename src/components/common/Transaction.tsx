import type { Transaction } from "../../constants/constants";

interface TransactionProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction: t }: TransactionProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 min-w-10 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
        <img src={t.logo} alt={t.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="text-primary text-B7 md:text-B6">{t.name}</span>
        <span className="text-xs text-slate-gray">
          {new Date(t.date).getTime() > new Date().setHours(0, 0, 0, 0)
            ? "Today "
            : new Date(t.date).getTime() >
              new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
                0,
                0,
                0,
                0
              )
            ? "Yesterday "
            : new Date(t.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }) + " "}
          {new Date(t.date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
