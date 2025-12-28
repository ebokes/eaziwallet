import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "../components/layout";
import Loading from "../components/common/Loading";
import { AnimatePresence, motion } from "framer-motion";

const Splash = lazy(() => import("../pages/auth/Splash"));
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const OTP = lazy(() => import("../pages/auth/Otp"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const History = lazy(() => import("../pages/dashboard/History"));
const More = lazy(() => import("../pages/dashboard/More/More"));
const Cards = lazy(() => import("../pages/dashboard/Card"));
const Analytics = lazy(() => import("../pages/dashboard/More/Analytics"));
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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split("/")[1] || "/"}>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Splash />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PageWrapper>
              <SignUp />
            </PageWrapper>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PageWrapper>
              <OTP />
            </PageWrapper>
          }
        />

        {/* Protected routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/more" element={<More />} />
          <Route path="/analytics" element={<Analytics />} />
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
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
