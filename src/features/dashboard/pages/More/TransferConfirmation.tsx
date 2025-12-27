import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SecurePaymentLine } from "../../../../components/ui/icons/Icons";
import BackBtn from "../../../../components/ui/BackBtn";
import { Button } from "../../../../components/ui/Button";

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

const TransferConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact, amount } = location.state as {
    contact: Contact;
    amount: number;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    navigate("/transfer-failed", {
      state: {
        biller: contact.name,
        amount: `$${amount.toFixed(2)}`,
        transactionNo: Math.random().toString(36).substring(2, 15),
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto px-6 py-6 md:px-8 md:py-8 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <BackBtn onClick={handleBack} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-R2 mb-8">Transfer to</h1>

          {/* Contact Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-B5 text-primary">{contact.name}</p>
              <p className="text-R6 text-secondary">{contact.phone}</p>
            </div>
          </div>

          {/* Amount Display */}
          <div className="mb-16">
            <p className="text-R7 text-secondary text-center mb-2">
              Enter Amount
            </p>
            <p className="text-R1 text-primary text-center">
              ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Secure Payment Button */}
        <Button
          onClick={handlePayment}
          variant="accent"
          leftIcon={<SecurePaymentLine />}
          className="w-full mb-4"
        >
          Secure payment
        </Button>
      </div>
    </div>
  );
};

export default TransferConfirmation;
