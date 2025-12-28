import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../dashboard/Sidebar";
import { BottomNav } from "../dashboard/BottomNav";
import Loading from "../common/Loading";

import { useUi } from "../../context/UiContext";

export const Layout: React.FC = () => {
  const location = useLocation();
  const { isModalActive } = useUi();

  // Paths that should display the main navigation (Sidebar/BottomNav)
  const SHOW_NAV_PATHS = ["/dashboard", "/history", "/cards", "/more"];
  const shouldShowNav = SHOW_NAV_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen bg-primary overflow-hidden">
      {shouldShowNav && <Sidebar />}
      <main
        className={`min-h-screen transition-all duration-300 ${
          shouldShowNav ? "md:pl-64 pb-20 md:pb-0" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto md:p-8">
          <React.Suspense fallback={<Loading />}>
            <Outlet />
          </React.Suspense>
        </div>
      </main>
      {shouldShowNav && !isModalActive && <BottomNav />}
      {/* <div className="h-[60px] bg-primary"></div> */}
    </div>
  );
};
