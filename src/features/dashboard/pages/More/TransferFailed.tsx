import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/Button";
import failure from "../../../../assets/dashboard/failure.png"

const TransferFailed: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToWallet = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-pale-pink dark:bg-secondary flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full">
        {/* Failure Image */}
        <div className="flex justify-center mb-6">
          <img src={failure} alt="failure" className="w-[230px]" />
        </div>

        {/* Failure Message */}
        <div className="text-center mb-8">
          <h1 className="text-S4 mb-2">Transfer Failed :(</h1>
          <p className="text-slate-gray">
            Your transfer has been declined due to a technical issue
          </p>
        </div>

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

export default TransferFailed;
