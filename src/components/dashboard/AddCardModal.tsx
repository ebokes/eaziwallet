import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Card } from "../../lib/constants";
import {
  addCardSchema,
  type AddCardSchema,
} from "../../features/dashboard/schemas/addCardSchema";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { ResponsiveModal } from "../ui/ResponsiveModal";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (card: Card) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCardSchema>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    mode: "onChange",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: AddCardSchema) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAdd({
        id: Date.now(),
        name: data.name,
        cardNumber: data.cardNumber,
        expiry: data.expiry,
        balance: "0.00",
        variant: Math.random() > 0.5 ? "primary" : "secondary",
      });
      setIsLoading(false);
      onClose();
      reset();
    }, 1000);
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} title="Add New Card">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Card Holder Name"
          placeholder="John Doe"
          {...register("name")}
          error={errors.name?.message}
        />

        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <Input
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              maxLength={16}
              error={errors.cardNumber?.message}
              {...field}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 16) value = value.slice(0, 16);
                field.onChange(value);
              }}
            />
          )}
        />

        <div className="flex gap-4">
          <Controller
            name="expiry"
            control={control}
            render={({ field }) => (
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                maxLength={5}
                error={errors.expiry?.message}
                {...field}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                  }
                  field.onChange(value);
                }}
              />
            )}
          />

          <Controller
            name="cvv"
            control={control}
            render={({ field }) => (
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                maxLength={3}
                error={errors.cvv?.message}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>
        <div className="pt-2">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Add Card
          </Button>
        </div>
      </form>
    </ResponsiveModal>
  );
};
