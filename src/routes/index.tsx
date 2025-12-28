import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import Loading from "../components/common/Loading";
// import splash from "../features/auth/pages/Splash"

const Splash = lazy(() => import("../pages/auth/Splash"));
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const OTP = lazy(() => import("../pages/auth/Otp"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const History = lazy(() => import("../pages/dashboard/History"));
const More = lazy(() => import("../pages/dashboard/More/More"));
const Cards = lazy(() => import("../pages/dashboard/Card"));
const Analytics = lazy(() => import("../pages/dashboard/Analytics"));
const About = lazy(() => import("../pages/dashboard/More/About"));
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const PayBills = lazy(() => import("../pages/dashboard/More/PayBills"));
const PaymentSuccess = lazy(
  () => import("../pages/dashboard/More/PaymentSuccess")
);
const Transfer = lazy(() => import("../pages/dashboard/More/Transfer"));
const TransferAmount = lazy(
  () => import("../pages/dashboard/More/TransferAmount")
);
const TransferConfirmation = lazy(
  () => import("../pages/dashboard/More/TransferConfirmation")
);
const TransferFailed = lazy(
  () => import("../pages/dashboard/More/TransferFailed")
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
