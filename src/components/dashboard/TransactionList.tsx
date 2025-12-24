import React from "react";
import DataTable, {
  type TableColumn,
  type TableStyles,
} from "react-data-table-component";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import walmartLogo from "../../assets/dashboard/Wallmart.png";
import netflixLogo from "../../assets/dashboard/Netflix.png";

interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  currency: string;
  name: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "received",
    amount: 35.23,
    currency: "USD",
    name: "Walmart",
    date: "Today 12:32",
    status: "completed",
  },
  {
    id: "2",
    type: "received",
    amount: 430.0,
    currency: "USD",
    name: "Top up",
    date: "Yesterday 02:12",
    status: "completed",
  },
  {
    id: "3",
    type: "sent",
    amount: 13.0,
    currency: "USD",
    name: "Netflix",
    date: "Dec 24 13:53",
    status: "completed",
  },
  {
    id: "4",
    type: "received",
    amount: 50.0,
    currency: "USD",
    name: "John Doe",
    date: "Dec 20 10:00",
    status: "completed",
  },
];

export const TransactionList: React.FC = () => {
  const columns: TableColumn<Transaction>[] = [
    {
      name: "Transaction",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          {/* Icon Box */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              row.name === "Walmart"
                ? "bg-blue-500 text-white"
                : row.name === "Netflix"
                ? "bg-black text-red-600"
                : row.name === "Top up"
                ? "bg-lavender text-majorelle-blue"
                : row.type === "received"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
           
            {row.name === "Top up" ? (
              <ArrowUpRight size={20} />
            ) : row.name === "Walmart" ? (
              <span className="font-bold text-lg">
                <img src={walmartLogo} alt="walmart logo" />{" "}
              </span>
            ) : row.name === "Netflix" ? (
              <span className="font-bold text-lg">
                <img src={netflixLogo} alt="netflix logo" />{" "}
              </span>
            ) : row.type === "received" ? (
              <ArrowDownLeft size={20} />
            ) : (
              <ArrowUpRight size={20} />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-sm">
              {row.name}
            </span>
            <span className="text-text-secondary text-xs">{row.date}</span>
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      cell: (row) => (
        <span
          className={`font-semibold text-sm ${
            row.type === "received" ? "text-shamrock" : "text-jelly-bean"
          }`}
        >
          {row.type === "received" ? "+" : "-"}${row.amount.toFixed(2)}
        </span>
      ),
      right: true,
    },
  ];

  const customStyles: TableStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
      },
    },
    headRow: {
      style: {
        display: "none" as const, 
      },
    },
    rows: {
      style: {
        backgroundColor: "transparent",
        minHeight: "72px", // height of row
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid" as const,
          borderBottomWidth: "1px",
          borderBottomColor: "#F5F5F5",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgba(230, 244, 244, 0.1)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    cells: {
      style: {
        paddingLeft: "0",
        paddingRight: "0",
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-primary">Latest Transactions</h3>
        <button className="text-text-secondary text-xs hover:text-primary transition-colors">
          View all
        </button>
      </div>
      <DataTable
        columns={columns}
        data={MOCK_TRANSACTIONS}
        customStyles={customStyles}
        pagination={false} 
      />
    </div>
  );
};
