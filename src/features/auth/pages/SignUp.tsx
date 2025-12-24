import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SocialIcons from "../../../components/auth/SocialIcons";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { CheckSquare, Square } from "lucide-react";
import TapNPayLogo from "../../../assets/auth/tap-n-pay-violet.webp";
import { signUpSchema, type SignUpSchema } from "../schemas/signUpSchema";
import BackBtn from "../../../components/ui/BackBtn";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreed: false,
    },
    mode: "onChange",
  });

  const agreed = watch("agreed");

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/verify-otp", { state: { email: data.email } });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 md:px-8">
        <div className="flex justify-start">
          <BackBtn />
        </div>
        <img src={TapNPayLogo} alt="TapNPay Logo" className="w-24 md:w-32" />
        <div /> {/* Empty column to balance the grid Layout */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-end md:justify-center px-4 md:px-0 w-full max-w-md mx-auto pb-8 md:pb-0">
        <h2 className="text-2xl font-bold mb-8">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Name"
            placeholder="e.g. John Doe"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            placeholder="e.g. email@example.com"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <div className="pt-2">
            <div
              className="flex items-start gap-2 cursor-pointer"
              onClick={() =>
                setValue("agreed", !agreed, { shouldValidate: true })
              }
            >
              {agreed ? (
                <CheckSquare
                  className="text-primary mt-0.5 shrink-0"
                  size={20}
                />
              ) : (
                <Square
                  className={`mt-0.5 shrink-0 ${
                    errors.agreed ? "text-primary" : "text-gray-300"
                  }`}
                  size={20}
                />
              )}
              <span
                className={`text-sm ${
                  errors.agreed ? "text-primary" : "text-text-secondary"
                }`}
              >
                I agree to the{" "}
                <span className="text-celtic-blue">Terms of Service</span> and{" "}
                <span className="text-celtic-blue">Privacy Policy</span>
              </span>
            </div>
            {errors.agreed && (
              <p className="text-xs text-golden-gate-bridge mt-1">
                {errors.agreed.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            Create a new account
          </Button>

          <SocialIcons />
        </form>
      </div>
    </div>
  );
};
export default Register;
