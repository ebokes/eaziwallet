import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillerModal } from "../../components/more/BillerModal";
import {
  DropLine,
  LightbulbFlashLine,
  SignalTowerLine,
} from "../../../../components/ui/icons/Icons";
import BackBtn from "../../../../components/ui/BackBtn";
import { SearchBar } from "../../../../components/ui/SearchBar";
import { BillerItem, type Biller } from "../../components/more/BillerItem";

const SAVED_BILLERS: Biller[] = [
  {
    id: "1",
    name: "Electricity",
    type: "Utility",
    due: "$132.32",
    status: "unpaid",
    dueDate: "December 29, 2022 - 12:32",
    registrationNo: "23010412432431",
    icon: <LightbulbFlashLine className="w-5 md:w-6 h-5 md:h-6" />,
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
    icon: <DropLine className="w-5 md:w-6 h-5 md:h-6" />,
    bgColor: "bg-cloud",
    textColor: "text-celtic-blue",
  },
  {
    id: "3",
    name: "Phone",
    type: "Utility",
    status: "paid",
    icon: <SignalTowerLine className="w-5 md:w-6 h-5 md:h-6" />,
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
    <div className="min-h-screen bg-primary">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <BackBtn onClick={handleBack} />
        </div>

        {/* Title */}
        <h1 className="text-R2 mb-8">Pay to</h1>

        {/* New Biller Button */}
        <button className="w-full flex items-center gap-4 p-4 bg-primary rounded-2xl shadow-sm mb-4 hover:bg-secondary transition-colors">
          <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6 text-ocean-blue" />
          </div>
          <span className="text-R7 md:text-R6 text-primary">New biller</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-light" />
          <div className="text-center text-secondary text-R7 md:text-R6 my-6">
            or
          </div>
          <hr className="w-full border-light" />
        </div>

        {/* Search */}
        <SearchBar
          placeholder="Search biller"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />

        {/* Saved Billers */}
        <div className="mb-4">
          <h2 className="text-R7 md:text-R6 text-primary mb-4">
            Saved billers
          </h2>
          <div className="space-y-3">
            {filteredBillers.map((biller) => (
              <BillerItem
                key={biller.id}
                biller={biller}
                onClick={handleBillerClick}
              />
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
