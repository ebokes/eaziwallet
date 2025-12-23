import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquare, Square, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import TapNPayLogo from "../../../assets/auth/tap-n-pay-violet.webp";
import Mobile from "../../../assets/auth/mobile-phone.webp";
import SocialIcons from "../../../components/auth/SocialIcons";
import { loginSchema, type LoginSchema } from "../schemas/loginSchema";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "password">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const rememberMe = watch("rememberMe");

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const isStepValid = await trigger("phone");
    if (!isStepValid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("password");
    }, 800);
  };

  const onSubmit = async (data: LoginSchema) => {
    console.log("Form Data:", data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-center h-screen">
      <div className="bg-lavender/70 w-full md:w-1/2 h-full grid place-items-center">
        <div className="flex flex-col items-center">
          <img src={TapNPayLogo} alt="TapNPay Logo" className="w-20 mb-10" />
          <img src={Mobile} alt="Mobile" className="w-[200px] md:w-[400px]" />
        </div>
      </div>
      <div className="w-[90%] md:w-1/2 m-8">
        <h1 className="text-S3 w-[170px] md:w-full mb-6">
          Enter your mobile number
        </h1>
        <form
          onSubmit={step === "phone" ? handleContinue : handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {step === "phone" && (
            <div className="animate-fade-in">
              <Input
                label="Mobile Number"
                placeholder="e.g. 08012345678"
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
              />
              <div className="mt-6">
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === "password" && (
            <div className="animate-slide-up space-y-6">
              <div className="flex items-center gap-2 mb-4 -mt-2">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  <ArrowLeft size={16} className="mr-1" /> Change Number
                </button>
              </div>

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setValue("rememberMe", !rememberMe)}
                  className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer"
                >
                  {rememberMe ? (
                    <CheckSquare size={18} className="text-primary" />
                  ) : (
                    <Square size={18} className="text-gray-400" />
                  )}
                  Remember me
                </button>
                <button
                  type="button"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign In
              </Button>
            </div>
          )}

          {step === "phone" && <SocialIcons />}

          <div className="text-center text-sm">
            <span className="text-text-secondary">Don't have an account? </span>
            <Link
              to="/register"
              className="font-bold text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
