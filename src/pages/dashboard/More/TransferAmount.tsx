import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { transferSchema, type TransferSchema } from "../../../schemas/dashboard/transferSchema";
import BackBtn from "../../../components/common/BackBtn";
import { Button } from "../../../components/common/Button";


interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

const TransferAmount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state as { contact: Contact };
  const [amount, setAmount] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value);
      setValue("amount", parseFloat(value) || 0);
    }
  };

  const onSubmit = (data: TransferSchema) => {
    navigate("/transfer-confirmation", {
      state: { contact, amount: data.amount },
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
        <div className="flex-1 flex flex-col items-center justify-start pt-8">
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

          {/* Amount Input */}
          <div className="mb-12 w-full max-w-xs mx-auto">
            <p className="text-R7 text-secondary text-center mb-4">
              Enter Amount
            </p>
            <div className="relative flex items-center justify-center">
              {amount && <span className="text-R1 text-silver-sand">$</span>}
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="$0.00"
                className="w-60 px-2 py-4 text-R1 text-center border-b-2 border-majorelle-blue bg-primary focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                autoFocus
              />
            </div>
            {errors.amount && (
              <p className="text-sm text-golden-gate-bridge text-center mt-2">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-indigo hover:bg-indigo/90 mb-4"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TransferAmount;
