import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const getSessionFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("offline-session");
    return session ? JSON.parse(session) : null;
  }
  return null;
};

const useAuth = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const onlineSession = await getSession();
      const offlineSession = getSessionFromLocalStorage();
      setSession(onlineSession || offlineSession);
    }
    fetchSession();
  }, []);

  return session;
};

export default useAuth;
