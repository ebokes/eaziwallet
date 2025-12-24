import { ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";

interface BalanceCardProps {
  balance: string;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white border border-white/5 shadow-xl">
      <div className="text-center mb-2">
        <span className="text-white/70 text-sm">Main balance</span>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-B1 tracking-tight">{balance}</h1>
      </div>

      <div className="flex justify-between items-center px-4 md:justify-center md:gap-16">
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <ArrowUpFromLine
              size={24}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </div>
          <span className="text-sm font-medium">Top up</span>
        </button>

        <div className="w-px h-10 bg-white/20"></div>

        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <ArrowDownToLine
              size={24}
              className="group-hover:translate-y-1 transition-transform"
            />
          </div>
          <span className="text-sm font-medium">Withdraw</span>
        </button>

        <div className="w-px h-10 bg-white/20"></div>

        <button className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <RefreshCw
              size={24}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          </div>
          <span className="text-sm font-medium">Transfer</span>
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
