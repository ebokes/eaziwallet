import React from "react";
import { Button } from "../../../../components/ui/Button";
import { ResponsiveModal } from "../../../../components/ui/ResponsiveModal";
import { SecurePaymentLine } from "../../../../components/ui/icons/Icons";

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

interface BillerModalProps {
  isOpen: boolean;
  onClose: () => void;
  biller: Biller;
  onPayment: () => void;
}

export const BillerModal: React.FC<BillerModalProps> = ({
  isOpen,
  onClose,
  biller,
  onPayment,
}) => {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      bold={false}
      title={
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-12 h-12 rounded-xl ${biller.bgColor} ${biller.textColor} flex items-center justify-center`}
          >
            {biller.icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-primary text-B5">{biller.name}</h3>
            <span className="text-secondary text-R6">{biller.type}</span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Due Amount Box */}
        {biller.due && (
          <div className="bg-golden-gate-bridge/10 rounded-xl py-6 flex items-center justify-center text-center">
            <span className="text-B3 text-golden-gate-bridge">
              Due: {biller.due}
            </span>
          </div>
        )}

        {/* Due Date */}
        {biller.dueDate && (
          <div className="border border-light  rounded-xl p-4">
            <span className="text-R6 text-secondary block mb-1">Due date</span>
            <span className="text-R5 text-primary">{biller.dueDate}</span>
          </div>
        )}

        {/* Registration Number */}
        {biller.registrationNo && (
          <div className="border border-light rounded-xl p-4">
            <span className="text-R6 text-secondary block mb-1">
              Registration no.
            </span>
            <span className="text-R5 text-primary">
              {biller.registrationNo}
            </span>
          </div>
        )}

        {/* Payment Button */}
        {biller.status === "unpaid" && (
          <Button
            variant="accent"
            onClick={onPayment}
            leftIcon={<SecurePaymentLine />}
          >
            Secure payment
          </Button>
        )}
      </div>
    </ResponsiveModal>
  );
};
