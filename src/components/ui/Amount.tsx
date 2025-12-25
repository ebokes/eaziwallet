import { ChevronRight } from "lucide-react";
import { type Transaction } from "../../lib/constants";

const Amount = ({ t }: { t: Transaction }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-bold text-sm ${
          t.type === "received" ? "text-shamrock" : "text-golden-gate-bridge"
        }`}
      >
        {t.type === "received" ? "+" : "-"}${t.amount.toFixed(2)}
      </span>
      <ChevronRight className="text-gray-400 w-4 h-4" />
    </div>
  );
};

export default Amount;
