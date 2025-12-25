import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avartar3 from "../../../assets/dashboard/ahmed.png";
import {
  default as Avartar,
  default as Avartar1,
} from "../../../assets/dashboard/ali.png"; // Placeholder for the avatar in the image
import Avartar2 from "../../../assets/dashboard/steve.png";
import BalanceCard from "../../../components/dashboard/home/BalanceCard";
import { TransactionList } from "../../../components/dashboard/home/TransactionList";
import TransactionModal from "../../../components/dashboard/TransactionModal";
import { Settings3Line } from "../../../components/icons/Icons";
import { Button } from "../../../components/ui/Button";
import { MOCK_TRANSACTIONS, type Transaction } from "../../../lib/constants";
import { formatCurrency } from "../../../lib/utils";

// Mock Data for Transfers
const RECENT_TRANSFERS = [
  { id: "1", name: "Ali", image: Avartar1 },
  { id: "2", name: "Steve", image: Avartar2 },
  { id: "3", name: "Ahmed", image: Avartar3 },
  { id: "4", name: "Maria", image: Avartar1 }, // Reuse for now
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const targetBalance = 14235.34;
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
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
          <button
            onClick={() => navigate("/profile")}
            className="p-2 text-white/90 hover:bg-white/10 rounded-full transition-colors"
          >
            <Settings3Line className="hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <BalanceCard balance={formatCurrency(balance)} />
      </div>

      {/* Bottom Section (White Background) */}
      <div className="flex-1 bg-white -mt-6 px-4 pt-8 pb-24 lg:px-8 lg:pt-12 lg:flex lg:gap-12 lg:items-start">
        {/* Recent Transfers */}
        <div className="mb-0 py-2 pb-6 lg:w-1/3 lg:border-r lg:border-gray-100 lg:pr-8">
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
        <div className="mt-2 lg:mt-0 lg:flex-1 space-y-4">
          <div className="flex gap-4 items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">
              Transactions
            </h2>
            <Button variant="ghost" className="text-[#6B6B6B]">
              View all
            </Button>
          </div>
          <TransactionList
            transactions={MOCK_TRANSACTIONS}
            onTransactionClick={handleTransactionClick}
          />
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTransaction={selectedTransaction}
      />
    </div>
  );
};
export default Dashboard;
