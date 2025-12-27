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
  UploadLine,
} from "../../../../components/ui/icons/Icons";
import { LogOut } from "lucide-react";

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
  const handleLogout = () => {
    // Mock logout
    navigate("/");
  };

  const actionItems: MenuItem[] = [
    {
      id: "pay-bills",
      label: "Pay bills",
      icon: <LightbulbFlashLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-lavender",
      textColor: "text-ocean-blue",
      onClick: () => navigate("/pay-bills"),
    },
    {
      id: "transfer",
      label: "Transfer",
      icon: <ExchangeFundsLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-cloud",
      textColor: "text-celtic-blue",
      onClick: () => navigate("/transfer"),
    },
    {
      id: "topup",
      label: "Topup",
      icon: <UploadLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-bright-green",
      textColor: "text-sea-green",
    },
    {
      id: "withdraw",
      label: "Withdraw",
      icon: <DownloadLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-pale-pink",
      textColor: "text-golden-gate-bridge",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <PieChart2Line className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-bright-gray",
      textColor: "text-violet",
      onClick: () => navigate("/analytics"),
    },
  ];

  const helpItems: MenuItem[] = [
    {
      id: "help",
      label: "Help",
      icon: <QuestionLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-blond",
      textColor: "text-golden",
    },
    {
      id: "contact",
      label: "Contact us",
      icon: <CustomerService2Line className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-columbia-blue",
      textColor: "text-emerald",
    },
    {
      id: "about",
      label: "About",
      icon: <InformationLine className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-lavender",
      textColor: "text-ocean-blue",
      onClick: () => navigate("/about"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut className="w-5 md:w-6 h-5 md:h-6" />,
      bgColor: "bg-pale-pink",
      textColor: "text-jelly-bean",
      onClick: handleLogout,
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <button
      key={item.id}
      onClick={item.onClick}
      className="w-full flex items-center gap-4 py-4 bg-primary hover:bg-secondary px-3 transition-colors active:bg-gray-100"
    >
      <div
        className={`md:w-12 md:h-12 w-8 h-8 rounded-md ${item.bgColor} ${item.textColor} flex items-center justify-center flex-shrink-0`}
      >
        {item.icon}
      </div>
      <span className="flex-1 text-left text-B7 md:text-B6">{item.label}</span>
      <ArrowRightSLine className="w-5 h-5 text-gray-400" />
    </button>
  );

  return (
    <div className="mt-4 mx-2 max-w-5xl">
      {/* Header */}
      <h1 className="px-6 text-B2 mb-5">More</h1>

      {/* Action Items */}
      <div className="bg-primary overflow-hidden shadow-sm mx-4">
        {actionItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item)}
            {index < actionItems.length - 1 && (
              <div className="border-b border-light mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Spacer/Divider */}
      <div className="border-b-8 border-light h-2 my-3" />

      {/* Help Items */}
      <div className="bg-primary rounded-2xl overflow-hidden shadow-sm mx-4">
        {helpItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderMenuItem(item)}
            {index < helpItems.length - 1 && (
              <div className="border-b border-light mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default More;
