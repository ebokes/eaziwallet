import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../features/dashboard/layout";
// import splash from "../features/auth/pages/Splash"

const Splash = lazy(() => import("../features/auth/pages/Splash"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const SignUp = lazy(() => import("../features/auth/pages/SignUp"));
const OTP = lazy(() => import("../features/auth/pages/Otp"));
const Dashboard = lazy(
  () => import("../features/dashboard/pages/Home/Dashboard")
);
const History = lazy(() => import("../features/dashboard/pages/History"));
const More = lazy(() => import("../features/dashboard/pages/More/More"));
const Cards = lazy(() => import("../features/dashboard/pages/Card"));
const Analytics = lazy(() => import("../features/dashboard/pages/Analytics"));
const About = lazy(() => import("../features/dashboard/pages/More/About"));
const Profile = lazy(() => import("../features/dashboard/pages/Home/Profile"));
const PayBills = lazy(
  () => import("../features/dashboard/pages/More/PayBills")
);
const PaymentSuccess = lazy(
  () => import("../features/dashboard/pages/More/PaymentSuccess")
);
const Transfer = lazy(
  () => import("../features/dashboard/pages/More/Transfer")
);
const TransferAmount = lazy(
  () => import("../features/dashboard/pages/More/TransferAmount")
);
const TransferConfirmation = lazy(
  () => import("../features/dashboard/pages/More/TransferConfirmation")
);
const TransferFailed = lazy(
  () => import("../features/dashboard/pages/More/TransferFailed")
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-otp" element={<OTP />} />
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/more" element={<More />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Sub-pages without bottom nav (Handled by Layout logic) */}
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pay-bills" element={<PayBills />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer-amount" element={<TransferAmount />} />
          <Route
            path="/transfer-confirmation"
            element={<TransferConfirmation />}
          />
          <Route path="/transfer-failed" element={<TransferFailed />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
