import { createContext, ReactNode, useState } from "react";

export type AppContextType = {
  someValue?: string;  // Added '?' to make this optional if you're not using it yet
  dataNotFound: boolean;
  setDataNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  isFinished: boolean;  // New
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;  // New
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [dataNotFound, setDataNotFound] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <AppContext.Provider value={{ dataNotFound, setDataNotFound, isFinished, setIsFinished }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
