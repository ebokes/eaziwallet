import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import amazon from "../../../assets/dashboard/Amazon.png";
import apple from "../../../assets/dashboard/Apple.png";
import netflix from "../../../assets/dashboard/Netflix.png";
import nike from "../../../assets/dashboard/Nike.png";
import homeDepot from "../../../assets/dashboard/The home depot.png";
import topup from "../../../assets/dashboard/Topup.png";
import wallmart from "../../../assets/dashboard/Wallmart.png";
import ali from "../../../assets/dashboard/ali.png";
import { Button } from "../../ui/Button";
import { ResponsiveModal } from "../../ui/ResponsiveModal";
import { CheckLine, FileCopyLine, FlagLine } from "../../icons/Icons";

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  currency: string;
  name: string;
  logo: string;
  date: string;
  status: "completed" | "pending" | "failed";
  transactionNo: string;
}

const getMockDate = (daysOffset: number, hours: number, minutes: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    logo: wallmart,
    type: "sent",
    amount: 35.23,
    currency: "USD",
    name: "Walmart",
    date: getMockDate(0, 12, 32),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "2",
    logo: topup,
    type: "received",
    amount: 430.0,
    currency: "USD",
    name: "Top up",
    date: getMockDate(1, 2, 12),
    status: "completed",
    transactionNo: "23010986462431",
  },
  {
    id: "3",
    logo: netflix,
    type: "sent",
    amount: 12.99,
    currency: "USD",
    name: "Netflix",
    date: getMockDate(2, 13, 53),
    status: "pending",
    transactionNo: "23010412432431",
  },
  {
    id: "4",
    logo: amazon,
    type: "sent",
    amount: 50.0,
    currency: "USD",
    name: "Amazon",
    date: getMockDate(3, 10, 0),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "5",
    logo: nike,
    type: "sent",
    amount: 150.0,
    currency: "USD",
    name: "Nike",
    date: getMockDate(4, 15, 30),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "6",
    logo: ali,
    type: "received",
    amount: 300.0,
    currency: "USD",
    name: "Ali Transfer",
    date: getMockDate(5, 9, 15),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "7",
    logo: apple,
    type: "sent",
    amount: 45.2,
    currency: "USD",
    name: "Apple Store",
    date: getMockDate(6, 18, 45),
    status: "completed",
    transactionNo: "23010412432431",
  },
  {
    id: "8",
    logo: homeDepot,
    type: "sent",
    amount: 200.0,
    currency: "USD",
    name: "The Home Depot",
    date: getMockDate(10, 11, 20),
    status: "completed",
    transactionNo: "23010412432431",
  },
];

export const formatTransactionDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today ${time}`;
  }
  if (isYesterday) {
    return `Yesterday ${time}`;
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day} ${time}`;
};

export const formatDetailedDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const fullDateTime = `${date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} - ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  let label = "";
  if (isToday) {
    label = "Today";
  } else if (isYesterday) {
    label = "Yesterday";
  } else {
    label = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return { label, fullDateTime };
};

export const TransactionList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
    setCopied(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">Transactions</h2>
        <Button variant="ghost" className="text-[#6B6B6B]">
          View all
        </Button>
      </div>

      <div className="overflow-clip">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* <thead className="border-b border-alice-blue hidden md:block">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-full">
                  Transaction
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                  Amount
                </th>
              </tr>
            </thead> */}
            <tbody className="divide-y divide-alice-blue">
              {MOCK_TRANSACTIONS.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => handleRowClick(t)}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <td className=" py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 min-w-10 rounded-md flex items-center justify-center bg-gray-50 overflow-hidden`}
                      >
                        <img
                          src={t.logo}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-text-primary">
                          {t.name}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {formatTransactionDate(t.date)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className=" py-4 whitespace-nowrap text-right text-sm font-bold flex items-center ">
                    <span
                      className={
                        t.type === "received"
                          ? "text-shamrock"
                          : "text-jelly-bean"
                      }
                    >
                      {t.type === "received" ? "+" : "-"}${t.amount.toFixed(2)}
                    </span>
                    <button className="ml-1">
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {MOCK_TRANSACTIONS.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-text-secondary"
                  >
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ResponsiveModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          bold={false}
          title={
            selectedTransaction ? (
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedTransaction.logo}
                    alt={selectedTransaction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-text-primary text-B4">
                    {selectedTransaction.name}
                  </h3>
                  <span className="text-text-secondary text-lg">
                    Retailer corporation
                  </span>{" "}
                </div>
              </div>
            ) : null
          }
        >
          {selectedTransaction && (
            <div className="flex flex-col gap-6">
              {/* Amount Box */}
              <div
                className={`bg-red-50 rounded-xl py-6 flex items-center justify-center text-center  ${
                  selectedTransaction.type === "received"
                    ? "bg-shamrock/10"
                    : "bg-golden-gate-bridge/10"
                }`}
              >
                <span
                  className={`text-S2 ${
                    selectedTransaction.type === "received"
                      ? "text-shamrock"
                      : "text-golden-gate-bridge"
                  }`}
                >
                  {selectedTransaction.type === "received" ? "+" : "-"}$
                  {selectedTransaction.amount.toFixed(2)}
                </span>
              </div>

              {/* Date Details */}
              <div className="border border-alice-blue rounded-xl p-4">
                <span className="text-R6 text-text-secondary block mb-1">
                  {formatDetailedDate(selectedTransaction.date).label}
                </span>
                <span className="text-R5 text-black-coral text-text-primary">
                  {formatDetailedDate(selectedTransaction.date).fullDateTime}
                </span>
              </div>

              {/* Transaction No */}
              <div className="border border-alice-blue rounded-xl p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-R6 text-state-gray block mb-1">
                    Transaction no.
                  </span>
                  <span className="text-R5 text-black-coral">
                    {selectedTransaction.transactionNo}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(selectedTransaction.transactionNo)}
                  className="text-text-secondary hover:text-primary transition-colors p-0"
                >
                  {copied ? (
                    <CheckLine className="w-5 h-5 text-shamrock" />
                  ) : (
                    <FileCopyLine className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Report Problem */}
              <Button variant="tertiary-warning" leftIcon={<FlagLine />}>
                Report a problem
              </Button>
            </div>
          )}
        </ResponsiveModal>
      </div>
    </div>
  );
};
