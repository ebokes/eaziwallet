import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Splash = lazy(() => import("../../features/auth/pages/Splash"));
const Login = lazy(() => import("../../features/auth/pages/Login"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
