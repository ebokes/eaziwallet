import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillerModal } from "../../../components/dashboard/BillerModal";
import {
  ArrowRightSLine,
  DropLine,
  LightbulbFlashLine,
  SignalTowerLine,
} from "../../../components/icons/Icons";
import BackBtn from "../../../components/ui/BackBtn";

interface Biller {
  id: string;
  name: string;
  type: string;
  due?: string;
  status?: "paid" | "unpaid";
  dueDate?: string;
  registrationNo?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const SAVED_BILLERS: Biller[] = [
  {
    id: "1",
    name: "Electricity",
    type: "Utility",
    due: "$132.32",
    status: "unpaid",
    dueDate: "December 29, 2022 - 12:32",
    registrationNo: "23010412432431",
    icon: <LightbulbFlashLine className="w-6 h-6" />,
    bgColor: "bg-lavender",
    textColor: "text-ocean-blue",
  },
  {
    id: "2",
    name: "Water",
    type: "Utility",
    due: "$32.21",
    status: "unpaid",
    dueDate: "December 30, 2022 - 10:00",
    registrationNo: "45678912345678",
    icon: <DropLine className="w-6 h-6" />,
    bgColor: "bg-cloud",
    textColor: "text-celtic-blue",
  },
  {
    id: "3",
    name: "Phone",
    type: "Utility",
    status: "paid",
    icon: <SignalTowerLine className="w-6 h-6" />,
    bgColor: "bg-bright-green",
    textColor: "text-sea-green",
  },
];

const PayBills: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBillerClick = (biller: Biller) => {
    setSelectedBiller(biller);
    setIsModalOpen(true);
  };

  const handlePayment = () => {
    setIsModalOpen(false);
    navigate("/payment-success", {
      state: {
        biller: selectedBiller?.name,
        amount: selectedBiller?.due,
        transactionNo: selectedBiller?.registrationNo,
      },
    });
  };

  const filteredBillers = SAVED_BILLERS.filter((biller) =>
    biller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <BackBtn onClick={handleBack} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Pay to</h1>

        {/* New Biller Button */}
        <button className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm mb-4 hover:bg-gray-50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6 text-ocean-blue" />
          </div>
          <span className="font-medium text-gray-900">New biller</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-alice-blue" />
          <div className="text-center text-slate-gray text-sm my-6">or</div>
          <hr className="w-full border-alice-blue" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search biller"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-alice-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
          />
        </div>

        {/* Saved Billers */}
        <div className="mb-4">
          <h2 className="text-sm font-medium text-slate-gray mb-4">
            Saved billers
          </h2>
          <div className="space-y-3">
            {filteredBillers.map((biller) => (
              <div key={biller.id}>
                <button
                  onClick={() => handleBillerClick(biller)}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-md ${biller.bgColor} ${biller.textColor} flex items-center justify-center flex-shrink-0`}
                  >
                    {biller.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{biller.name}</p>
                    <p className="text-sm text-slate-gray">
                      {biller.status === "paid"
                        ? "All paid"
                        : `Due: ${biller.due}`}
                    </p>
                  </div>
                  <ArrowRightSLine className="w-5 h-5 text-gray-400" />
                </button>
                <hr className="w-full border-alice-blue" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biller Modal */}
      {selectedBiller && (
        <BillerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          biller={selectedBiller}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default PayBills;
