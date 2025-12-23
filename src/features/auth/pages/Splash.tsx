import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TapNPayLogo from "../../../assets/auth/tap-n-pay.png";

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-majorelle-blue flex items-center justify-center">
      <div className="animate-pulse">
        <img src={TapNPayLogo} alt="Tap'nPay Logo" />
      </div>
    </div>
  );
};

export default Splash;
