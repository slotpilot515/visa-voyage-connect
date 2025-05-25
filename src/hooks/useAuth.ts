import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

/** Rehydrates Firebase Auth and tells the app when it’s ready. */
export default function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  // undefined  → still loading   null → signed-out   User → signed-in

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  return user;
}