import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthHeader from "../components/AuthHeader";
import { OTPInput } from "../components/OTPInput";
import { Button } from "../../../components/ui/Button";

// Minimum validation schema
const otpSchema = z.object({
  otp: z.string().length(6, "Code must be 6 digits"),
});

type OtpSchema = z.infer<typeof otpSchema>;

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const email = location.state?.email || "999";
  const phoneNumber = "+962 79 XXX-XXXX";

  const [timer, setTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    // setValue,
    formState: { isValid },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: OtpSchema) => {
    console.log("Verifying:", data.otp);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <AuthHeader />
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 mt-8">
        {/* Info Box */}
        <div className="w-full max-w-sm bg-blue-50 p-3 text-center mb-10">
          <p className="text-B6 text-primary">
            An SMS sent to your mobile number
          </p>
          <p className="text-B6 text-primary">{phoneNumber}</p>
        </div>

        <h3 className="text-secondary text-R7 mb-4">Enter six-digit code</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OTPInput
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                }}
              />
            )}
          />

          <div className="mt-8 mb-auto">
            <p className="text-R7 text-secondary mb-6">
              Resend code{" "}
              <span className="text-primary text-R6 ml-1">
                {formatTime(timer)}
              </span>
            </p>
          </div>

          {/* Bottom Button */}
          <div className="w-full mt-auto pb-8 md:pb-0 md:mt-12">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={!isValid}
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OTPVerification;
