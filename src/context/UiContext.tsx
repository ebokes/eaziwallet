import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface UiContextType {
  isModalActive: boolean;
  setIsModalActive: (isActive: boolean) => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <UiContext.Provider value={{ isModalActive, setIsModalActive }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
};
