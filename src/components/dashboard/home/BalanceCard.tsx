import { Link } from "react-router-dom";
import {
  DownloadLine,
  ExchangeFundsLine,
  UploadLine,
} from "../../../components/common/icons/Icons";

interface BalanceCardProps {
  balance: string;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-white border border-white/5 shadow-xl mb-8">
      <div className="text-center mb-2">
        <span className="text-[#B2A1E4] text-R7 md:text-R6">Main balance</span>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-B1 tracking-tight">{balance}</h1>
      </div>

      <div className="flex justify-between items-center px-4 md:justify-center md:gap-16">
        <Link to="/top-up" className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <UploadLine className="group-hover:-translate-y-1 transition-transform" />
          </div>
          <span className="text-sm font-medium">Top up</span>
        </Link>

        <div className="w-px h-10 bg-white/20"></div>

        <Link to="/withdraw" className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <DownloadLine className="group-hover:translate-y-1 transition-transform text-white" />
          </div>
          <span className="text-sm font-medium">Withdraw</span>
        </Link>

        <div className="w-px h-10 bg-white/20"></div>

        <Link to="/transfer" className="flex flex-col items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <ExchangeFundsLine className="group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <span className="text-sm font-medium">Transfer</span>
        </Link>
      </div>
    </div>
  );
};

export default BalanceCard;
