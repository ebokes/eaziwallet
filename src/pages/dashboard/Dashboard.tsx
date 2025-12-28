import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Avartar3 from "../../assets/dashboard/ahmed.png";
import Avartar from "../../assets/dashboard/ali.png";
import Avartar1 from "../../assets/dashboard/ali.png";
import Avartar2 from "../../assets/dashboard/steve.png";
import BalanceCard from "../../components/dashboard/home/BalanceCard";
import { TransactionList } from "../../components/dashboard/home/TransactionList";
import { Settings3Line } from "../../components/common/icons/Icons";
import { Button } from "../../components/common/Button";
import { MOCK_TRANSACTIONS, type Transaction } from "../../constants/constants";
import { formatCurrency } from "../../utils/utils";
import TransactionModal from "../../components/dashboard/more/TransactionModal";

// Mock Data for Transfers
const RECENT_TRANSFERS = [
  { id: "1", name: "Ali", image: Avartar1 },
  { id: "2", name: "Steve", image: Avartar2 },
  { id: "3", name: "Ahmed", image: Avartar3 },
  { id: "4", name: "Maria", image: Avartar1 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 } as const,
  },
};

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
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-primary flex flex-col pb-0 md:pb-0"
    >
      {/* Top Section (Indigo Background) */}
      <motion.div
        variants={itemVariants}
        className="bg-indigo px-6 pt-12 pb-8 rounded-b-3xl"
      >
        {/* Header content ... */}
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
              <h2 className="text-B6 md:text-B5">Hello,</h2>
              <h1 className="text-B6 md:text-B5">Abdullah!</h1>
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
      </motion.div>

      {/* Bottom Section (White Background) */}
      <div className="flex-1 bg-primary -mt-6 pt-8 pb-24 lg:px-8 lg:pt-12 lg:flex lg:gap-12 lg:items-start px-4 ">
        {/* Recent Transfers */}
        <motion.div
          variants={itemVariants}
          className="mb-0 py-2 md:py-0 pb-6 lg:w-1/3 lg:border-r lg:border-soft lg:pr-8"
        >
          <h3 className="text-B6 md:text-B5 text-primary mb-4">
            Recent Transfers
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-6 overflow-x-auto pb-2 no-scrollbar lg:flex-wrap "
          >
            {/* Add Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <button className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center text-black shadow-sm hover:shadow-md transition-shadow">
                <Plus size={24} />
              </button>
              <span className="text-R7 text-primary">Add</span>
            </motion.div>

            {RECENT_TRANSFERS.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                className="flex flex-col items-center gap-2 min-w-[60px]"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-R7 text-primary">{user.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Latest Transactions */}
        <motion.div
          variants={itemVariants}
          className="mt-2 lg:mt-0 lg:flex-1 space-y-4"
        >
          <div className="flex gap-2 items-center justify-between -mb-2">
            <h2 className="text-B6 md:text-B5 text-primary">
              Latest Transactions
            </h2>
            <Button
              variant="ghost"
              size="xs"
              className="text-R7 text-[#6B6B6B]"
            >
              View all
            </Button>
          </div>
          <TransactionList
            transactions={MOCK_TRANSACTIONS}
            onTransactionClick={handleTransactionClick}
          />
        </motion.div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTransaction={selectedTransaction}
      />
    </motion.div>
  );
};
export default Dashboard;
