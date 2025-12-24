import React, { useEffect, useState } from "react";
import {
  Settings,
  ArrowUpFromLine,
  ArrowDownToLine,
  RefreshCw,
  Plus,
} from "lucide-react";
import { TransactionList } from "../../../components/dashboard/TransactionList";
import Avartar from "../../../assets/dashboard/ali.png"; // Placeholder for the avatar in the image
import Avartar1 from "../../../assets/dashboard/ali.png";
import Avartar2 from "../../../assets/dashboard/steve.png";
import Avartar3 from "../../../assets/dashboard/ahmed.png";
import BalanceCard from "../../../components/dashboard/BalanceCard";

// Mock Data for Transfers
const RECENT_TRANSFERS = [
  { id: "1", name: "Ali", image: Avartar1 },
  { id: "2", name: "Steve", image: Avartar2 },
  { id: "3", name: "Ahmed", image: Avartar3 },
  //   { id: "4", name: "Maria", image: Avartar }, // Reuse for now
];

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const targetBalance = 14235.34;

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetBalance / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetBalance) {
        setBalance(targetBalance);
        clearInterval(timer);
      } else {
        setBalance(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20 md:pb-0">
      {/* Top Section (Indigo Background) */}
      <div className="bg-indigo px-6 pt-12 pb-8 rounded-b-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 bg-orange-100">
              <img
                src={Avartar}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-R3">Hello,</h2>
              <h1 className="text-R3">Abdullah!</h1>
            </div>
          </div>
          <button className="p-2 text-white/90 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={24} />
          </button>
        </div>

        <BalanceCard balance={formatCurrency(balance)} />
      </div>

      {/* Bottom Section (White Background) */}
      <div className="flex-1 bg-white -mt-6 px-6 pt-8 pb-24 lg:px-8 lg:pt-12 lg:flex lg:gap-12 lg:items-start">
        {/* Recent Transfers */}
        <div className="mb-0 p-2 pb-6 lg:w-1/3 lg:border-r lg:border-gray-100 lg:pr-8">
          <h3 className="font-bold text-text-primary mb-4">Recent Transfers</h3>
          <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar lg:flex-wrap">
            {/* Add Button */}
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <button className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center text-black shadow-sm hover:shadow-md transition-shadow">
                <Plus size={24} />
              </button>
              <span className="text-xs font-medium text-text-primary">Add</span>
            </div>

            {RECENT_TRANSFERS.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center gap-2 min-w-[60px]"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-text-primary">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="mt-2 lg:mt-0 lg:flex-1">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
