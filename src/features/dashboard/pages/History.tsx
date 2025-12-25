import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionList } from "../../../components/dashboard/home/TransactionList";
import TransactionModal from "../../../components/dashboard/TransactionModal";
import { Search2Line } from "../../../components/icons/Icons";
import { Input } from "../../../components/ui/Input";
import { useModal } from "../../../hooks/useModal";
import { MOCK_TRANSACTIONS, type Transaction } from "../../../lib/constants";
import { groupTransactionsByDate } from "../../../lib/utils";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">(
    "all"
  );

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

  return (
    <div className="space-y-6">
      <h1 className="text-B3 mt-4 mx-4">History</h1>
      <div className="flex gap-4 mx-4">
        <Input
          placeholder="Search by name or amount"
          leftIcon={<Search2Line />}
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
            <SlidersHorizontal size={20} />
          </div>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "sent" | "received")
            }
            className="appearance-none pl-10 pr-8 py-3.5 text-base rounded-md font-semibold transition-all duration-200 focus:outline-none cursor-pointer border border-azureish-white text-primary hover:bg-azureish-white/5 bg-transparent"
          >
            <option value="all">Filter: All</option>
            <option value="sent">Filter: Sent</option>
            <option value="received">Filter: Received</option>
          </select>
        </div>
      </div>

      <div className="space-y-6 ">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-center py-10 text-text-secondary">
            No transactions found.
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date}>
              <h3 className="text-black-coral text-R5 font-medium mb-3 whitespace-pre-line mx-4">
                {date}
              </h3>
              <div className="mx-4">
                <TransactionList
                  transactions={transactions}
                  onTransactionClick={handleTransactionClick}
                />
              </div>
              <div className="bg-alice-blue h-2 mt-4"></div>
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
