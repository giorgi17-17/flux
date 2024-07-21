import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const useEmail = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setEmail(user ? user.email : null);
    });

    return () => unsubscribe();
  }, []);

  return email || "";
};

export default useEmail;
