import { LogOut, Moon, Sun } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { CardsData, HistoryData, HomeData, MoreData } from "./NavIcons";

export const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const navItems = [
    { iconData: HomeData, label: "Home", path: "/dashboard" },
    { iconData: HistoryData, label: "History", path: "/history" },
    { iconData: CardsData, label: "Cards", path: "/cards" },
    { iconData: MoreData, label: "More", path: "/more" },
  ];

  const handleLogout = () => {
    // Mock logout
    navigate("/");
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 p-6 shadow-elevation-card z-50">
      <div className="mb-10 flex justify-between items-center gap-3">
        <h1 className="text-xl font-bold text-primary">Eazi Wallet</h1>
        <div className="cursor-pointer">
          {theme === "dark" ? (
            <Sun size={20} onClick={toggleTheme} />
          ) : (
            <Moon size={20} onClick={toggleTheme} />
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group 
              ${
                isActive
                  ? "bg-majorelle-blue text-white shadow-elevation-low"
                  : "text-secondary hover:text-primary hover:bg-majorelle-blue/30 "
              }
            `}
          >
            {({ isActive }) => (
              <>
                <div className="w-6 h-6 flex justify-center items-center">
                  {isActive ? item.iconData.active : item.iconData.inactive}
                </div>
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-jelly-bean rounded-xl w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
