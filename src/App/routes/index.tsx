import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../../layouts/Layout";

const Splash = lazy(() => import("../../features/auth/pages/Splash"));
const Login = lazy(() => import("../../features/auth/pages/Login"));
const SignUp = lazy(() => import("../../features/auth/pages/SignUp"));
const OTP = lazy(() => import("../../features/auth/pages/OTP"));
const Dashboard = lazy(
  () => import("../../features/dashboard/pages/Dashboard")
);
const History = lazy(() => import("../../features/dashboard/pages/History"));
const More = lazy(() => import("../../features/dashboard/pages/More"));
const Cards = lazy(() => import("../../features/dashboard/pages/Cards"));
const About = lazy(() => import("../../features/dashboard/pages/About"));
const Profile = lazy(() => import("../../features/dashboard/pages/Profile"));

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
        </Route>
        {/* Pages without bottom nav */}
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
