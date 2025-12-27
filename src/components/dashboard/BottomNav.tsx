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
  const {theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-soft px-6 pb-2 pt-1 flex justify-between items-end z-50 md:hidden ">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) => `
            relative flex flex-col items-center gap-1 transition-all duration-300 w-16
            ${isActive ? "text-majorelle-blue  -mt-1" : "text-primary"}
          `}
        >
          {({ isActive }) => (
            <>
              {/* Active Indicator Line */}
              {isActive && (
                <span className="absolute -top-[6px] w-full h-[3px] bg-majorelle-blue rounded-b-sm" />
              )}

              <div className="mt-2">
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
      <div className="cursor-pointer space-y-[4px] flex flex-col items-center">
        {theme === "dark" ? (
          <Sun size={20} onClick={toggleTheme} />
        ) : (
          <Moon size={20} onClick={toggleTheme} />
        )}
        <p className="text-[10px] font-medium">{theme === "dark" ? "Light" : "Dark"}</p>
      </div>
    </div>
  );
};
