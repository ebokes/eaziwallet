import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Splash = lazy(() => import("../../features/auth/pages/Splash"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const SignUp = lazy(() => import("../../features/auth/pages/SignUp"));
const OTP = lazy(() => import("../../features/auth/pages/Otp"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<OTP />} />
      </Routes>
    </BrowserRouter>
  );
}
