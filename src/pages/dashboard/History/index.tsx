import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { TransactionList } from "../../../components/dashboard/home/TransactionList";
import { SearchBar } from "../../../components/common/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../../hooks/useModal";
import {
  MOCK_TRANSACTIONS,
  type Transaction,
} from "../../../constants/constants";
import { groupTransactionsByDate } from "../../../utils/utils";
import TransactionModal from "../../../components/dashboard/more/TransactionModal";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">(
    "all"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { openModal, setOpenModal, handleModalClose } = useModal();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery);
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const filterOptions = [
    { value: "all", label: "All Transactions" },
    { value: "sent", label: "Money Sent" },
    { value: "received", label: "Money Received" },
  ];

  return (
    <div className="">
      <h1 className="text-B2 mt-4 mx-4">History</h1>
      <div className="flex items-center justify-between gap-4 mx-4 my-5 bg-primary">
        <SearchBar
          placeholder="Search by name or amount"
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Custom Dropdown Menu (Chakra UI style) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-4 py-2.5 text-S6 rounded-md font-semibold border-2 border-soft text-primary hover:border-majorelle-blue/30 hover:bg-majorelle-blue/5 bg-primary shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <SlidersHorizontal size={16} className="text-majorelle-blue" />
            <span>
              {filterType === "all"
                ? "All"
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-gray transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-52 bg-primary border border-soft rounded-lg shadow-elevation-low z-50 overflow-hidden"
              >
                <div className="py-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterType(option.value as any);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-S6 transition-colors ${
                        filterType === option.value
                          ? "text-majorelle-blue bg-majorelle-blue/10 font-bold"
                          : "text-primary hover:bg-secondary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-6 ">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-center py-10 text-secondary">
            No transactions found.
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date}>
              <h3 className="text-primary text-R5 font-medium mb-3 whitespace-pre-line mx-4">
                {date}
              </h3>
              <div className="mx-4">
                <TransactionList
                  transactions={transactions}
                  onTransactionClick={handleTransactionClick}
                />
              </div>
              <div className="border-b-4 border-light h-2 mt-4"></div>
            </div>
          ))
        )}
      </div>
      <TransactionModal
        isOpen={openModal}
        onClose={handleModalClose}
        selectedTransaction={selectedTransaction}
      />
    </div>
  );
};

export default History;
