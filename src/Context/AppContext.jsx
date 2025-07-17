import { createContext } from "react";
import { useContext } from "react";

export const AppContext = createContext();

// Custom hook for using context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

// export default AppContext;
