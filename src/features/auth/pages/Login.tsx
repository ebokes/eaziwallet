import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Mobile from "../../../assets/auth/mobile-phone.png";
import Secure from "../../../assets/auth/secure.png";
import TapNPayLogo from "../../../assets/auth/tap-n-pay-violet.webp";
import SocialIcons from "../../../components/auth/SocialIcons";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ResponsiveModal } from "../../../components/ui/ResponsiveModal";
import {
  forgotPasswordSchema,
  loginSchema,
  type ForgotPasswordSchema,
  type LoginSchema,
} from "../schemas/loginSchema";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "password">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetMethod, setResetMethod] = useState<"email" | "mobile">("email");

  const {
    register,
    handleSubmit,
    trigger,
    // setValue,
    // watch,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    setValue: setValueForgot,
    clearErrors: clearErrorsForgot,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      method: "email",
      email: "",
      mobile: "",
    },
    mode: "onChange",
  });

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

  const handleForgotPasswordSubmit = (data: ForgotPasswordSchema) => {
    console.log("Forgot Password Data:", data);
    // Handle reset logic
    setIsForgotPasswordOpen(false);
  };

  const toggleResetMethod = () => {
    const newMethod = resetMethod === "email" ? "mobile" : "email";
    setResetMethod(newMethod);
    setValueForgot("method", newMethod);
    clearErrorsForgot();
  };
  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-center h-screen overflow-hidden">
      <div className="bg-lavender/70 w-full md:w-1/2 h-1/2 md:h-full grid place-items-center">
        <div className="w-full md:hidden ml-4 gap-2 mt-2 text-celtic-blue font-medium">
          {/* <button
            type="button"
            onClick={() => setStep("phone")}
            className="flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} className="mr-1 flex justify-self-start" />{" "}
            Back
          </button> */}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-10">
            <img
              src={TapNPayLogo}
              alt="TapNPay Logo"
              className="w-20 md:w-32"
            />
          </div>
          {step === "password" ? (
            <img
              src={Secure}
              alt="shield"
              className="w-[200px] md:w-[300px] "
            />
          ) : (
            <img
              src={Mobile}
              alt="Mobile"
              className="w-[200px] md:w-[300px] lg:w-[400px]"
            />
          )}
        </div>
      </div>
      <div className="flex justify-center w-full md:w-1/2 h-1/2 md:h-auto m-8">
        <div className="w-full mx-4 md:mx-10 max-w-[600px]">
          {step === "password" ? (
            <h1 className="text-S3 mb-6">Enter your password</h1>
          ) : (
            <h1 className="text-S3 w-[170px] md:w-full mb-6">
              Enter your mobile number
            </h1>
          )}
          <form
            onSubmit={
              step === "phone" ? handleContinue : handleSubmit(onSubmit)
            }
            className="space-y-6"
          >
            {step === "phone" && (
              <div className="animate-fade-in">
                <Input
                  label="Mobile number"
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
                <div className="">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    error={errors.password?.message}
                  />

                  <div className="flex items-center justify-end w-full mt-4">
                    <button
                      type="button"
                      className="text-sm font-bold text-celtic-blue hover:underline"
                      onClick={() => setIsForgotPasswordOpen(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <div className="self-end">
                  <Button type="submit" fullWidth isLoading={isLoading}>
                    Login
                  </Button>
                </div>
              </div>
            )}

            {step === "phone" && <SocialIcons />}

            {step === "phone" && (
              <div className="text-center text-sm">
                <span className="text-text-secondary">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/sign-up"
                  className="font-bold text-celtic-blue hover:underline"
                >
                  Sign up
                </Link>
              </div>
            )}
          </form>
          {/* Forgot Password Modal */}
          <ResponsiveModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
            title="Forgot your Password?"
          >
            <div className="space-y-6">
              <form
                onSubmit={handleSubmitForgot(handleForgotPasswordSubmit)}
                className="space-y-4"
              >
                {resetMethod === "email" ? (
                  <Input
                    label="Email"
                    placeholder="e.g. email@example.com"
                    type="email"
                    {...registerForgot("email")}
                    error={errorsForgot.email?.message}
                  />
                ) : (
                  <Input
                    label="Mobile Number"
                    placeholder="e.g. +1 234 567 890"
                    type="tel"
                    {...registerForgot("mobile")}
                    error={errorsForgot.mobile?.message}
                  />
                )}

                <Button type="submit" fullWidth>
                  Send Reset Link
                </Button>
              </form>

              <div className="text-center">
                <Button variant="ghost" size="xs"
                  onClick={toggleResetMethod}
                  className="text-B6 text-celtic-blue"
                >
                  Use {resetMethod === "email" ? "mobile" : "email"} instead
                </Button>
              </div>
            </div>
          </ResponsiveModal>
         
        </div>
      </div>
    </div>
  );
};
export default Login;
