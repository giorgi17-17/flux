import { createContext, ReactNode, useState } from "react";

export type AppContextType = {
  someValue?: string; // Added '?' to make this optional if you're not using it yet
  dataNotFound: boolean;
  setDataNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  isFinished: boolean; // New
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>; // New
  generateUniqueId: () => string;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [dataNotFound, setDataNotFound] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  // localStorage.setItem("formData", JSON.stringify(false));
  // localStorage.setItem("email", JSON.stringify(false));
  const generateUniqueId = () => {
    let userId = localStorage.getItem("myCustomId");
   
    if (!userId) {
      userId = "_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("myCustomId", userId);
    }

    return userId;
  };

  localStorage.setItem("myCustomId", generateUniqueId());
  // console.log(generateUniqueId());

  return (
    <AppContext.Provider
      value={{
        dataNotFound,
        setDataNotFound,
        isFinished,
        setIsFinished,
        generateUniqueId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
