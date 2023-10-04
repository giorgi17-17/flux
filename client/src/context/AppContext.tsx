import { createContext, ReactNode, useState } from "react";

export type AppContextType = {
  someValue: string;
  dataNotFound: boolean;
  setDataNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const someValue = "Hello from Context!";
  const [dataNotFound, setDataNotFound] = useState(false);

  return (
    <AppContext.Provider value={{ someValue, dataNotFound, setDataNotFound }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
