import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import success from "../../../../assets/dashboard/success.png";
import {
  CheckLine,
  FileCopyLine,
  FlagLine,
} from "../../../../components/ui/icons/Icons";
import { useCopy } from "../../../../hooks/useCopy";
import { Button } from "../../../../components/ui/Button";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { biller, amount, transactionNo } = location.state || {};
  const { copied, handleCopy } = useCopy();

  const handleBackToWallet = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img src={success} alt="success" className="w-[230px]" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-S4 mb-2">Payment done!</h1>
          <p className="text-secondary">
            Bill payment has been done successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-primary rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Payment details</h2>

          <div className="space-y-4">
            {/* Biller */}
            <div className="pb-4 border rounded-lg p-3 border-light">
              <p className="text-sm text-secondary mb-1">Biller</p>
              <p className="text-gray-900">
                {biller || "Electricity company inc."}
              </p>
            </div>

            {/* Amount */}
            <div className="pb-4 border rounded-lg p-3 border-light">
              <p className="text-sm text-secondary mb-1">Amount</p>
              <p className="text-gray-900">{amount || "$132.32"}</p>
            </div>

            {/* Transaction Number */}
            <div className="pb-4 border rounded-lg p-3 border-light">
              <p className="text-sm text-secondary mb-1">Transaction no.</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-900">
                  {transactionNo || "23010412432431"}
                </p>
                <button
                  onClick={() => handleCopy(transactionNo || "23010412432431")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckLine className="w-5 h-5 text-shamrock" />
                  ) : (
                    <FileCopyLine className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Problem */}
        <button className="w-full flex items-center justify-center gap-2 text-golden-gate-bridge font-medium mb-6 py-2 hover:underline">
          <FlagLine className="w-5 h-5" />
          Report a problem
        </button>

        {/* Back to Wallet Button */}
        <Button
          onClick={handleBackToWallet}
          className="w-full bg-indigo hover:bg-indigo/90"
        >
          Back to wallet
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
