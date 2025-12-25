import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightSLine,
  CustomerService2Line,
  DownloadLine,
  ExchangeFundsLine,
  InformationLine,
  LightbulbFlashLine,
  PieChart2Line,
  QuestionLine,
  UploadLine
} from "../../../components/icons/Icons";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  onClick?: () => void;
}

const More: React.FC = () => {
  const navigate = useNavigate();

  const actionItems: MenuItem[] = [
    {
      id: "pay-bills",
      label: "Pay bills",
      icon: <LightbulbFlashLine className="w-6 h-6" />,
      bgColor: "bg-lavender",
      textColor: "text-ocean-blue",
    },
    {
      id: "transfer",
      label: "Transfer",
      icon: <ExchangeFundsLine className="w-6 h-6" />,
      bgColor: "bg-cloud",
      textColor: "text-celtic-blue",
    },
    {
      id: "topup",
      label: "Topup",
      icon: <UploadLine className="w-6 h-6" />,
      bgColor: "bg-bright-green",
      textColor: "text-sea-green",
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: <DownloadLine className="w-6 h-6" />,
      bgColor: "bg-pale-pink",
      textColor: "text-golden-gate-bridge",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <PieChart2Line className="w-6 h-6" />,
      bgColor: "bg-bright-gray",
      textColor: "text-violet",
    },
  ];

  const helpItems: MenuItem[] = [
    {
      id: "help",
      label: "Help",
      icon: <QuestionLine className="w-6 h-6" />,
      bgColor: "bg-blond",
      textColor: "text-golden",
    },
    {
      id: "contact",
      label: "Contact us",
      icon: <CustomerService2Line className="w-6 h-6" />,
      bgColor: "bg-columbia-blue",
      textColor: "text-emerald",
    },
    {
      id: "about",
      label: "About",
      icon: <InformationLine className="w-6 h-6" />,
      bgColor: "bg-lavender",
      textColor: "text-ocean-blue",
      onClick: () => navigate("/about"),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <button
      key={item.id}
      onClick={item.onClick}
      className="w-full flex items-center gap-4 py-4 bg-white hover:bg-gray-50 transition-colors active:bg-gray-100"
    >
      <div
        className={`w-12 h-12 rounded-md ${item.bgColor} ${item.textColor} flex items-center justify-center flex-shrink-0`}
      >
        {item.icon}
      </div>
      <span className="flex-1 text-left font-medium text-gray-900">
        {item.label}
      </span>
      <ArrowRightSLine className="w-5 h-5 text-gray-400" />
    </button>
  );

  return (
    <div className="py-6 md:p-8 max-w-3xl mx-auto min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <h1 className="px-4 text-2xl font-bold mb-8">More</h1>

      {/* Action Items */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm mx-4">
        {actionItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item)}
            {index < actionItems.length - 1 && (
              <div className="border-b border-alice-blue mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Spacer/Divider */}
      <div className="bg-alice-blue h-2 my-3" />

      {/* Help Items */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm mx-4">
        {helpItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item)}
            {index < helpItems.length - 1 && (
              <div className="border-b border-alice-blue mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default More;
