import React from "react";
import { NavLink } from "react-router-dom";
import { HomeData, HistoryData, CardsData, MoreData } from "./NavIcons";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const BottomNav: React.FC = () => {
  const navItems = [
    { iconData: HomeData, label: "Home", path: "/dashboard" },
    { iconData: HistoryData, label: "History", path: "/history" },
    { iconData: CardsData, label: "Cards", path: "/cards" },
    { iconData: MoreData, label: "More", path: "/more" },
  ];
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-primary border-t border-soft px-6 pt-1 flex justify-between items-end z-50 md:hidden"
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          aria-label={item.label}
          className={({ isActive }) => `
            relative flex flex-col items-center gap-1 transition-all duration-300 w-16
            ${isActive ? "text-majorelle-blue -mt-1" : "text-primary"}
          `}
        >
          {({ isActive }) => (
            <>
              {/* Active Indicator Line */}
              {isActive && (
                <span
                  className="absolute -top-[6px] w-full h-[3px] bg-majorelle-blue rounded-b-sm"
                  aria-hidden="true"
                />
              )}

              <div className="mt-2" aria-hidden="true">
                {isActive ? item.iconData.active : item.iconData.inactive}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "font-bold" : ""
                }`}
              >
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
      <div
        className="cursor-pointer space-y-[6px] mt-[1px] px-4 flex flex-col items-center"
        role="button"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        tabIndex={0}
        onClick={toggleTheme}
        onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
      >
        <div aria-hidden="true">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </div>
        <p className="text-[10px] font-medium">
          {theme === "dark" ? "Light" : "Dark"}
        </p>
      </div>
    </nav>
  );
};
