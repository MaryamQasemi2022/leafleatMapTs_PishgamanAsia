import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
interface PropType {
  children: React.ReactNode;
}
interface GlobalContent {
  user: string;
  login: (user: User) => void;
}

interface User {
  username: string;
  password: string;
}
const AuthContext = createContext<GlobalContent>({
  user: "maryam",
  login: () => {},
});

export default AuthContext;

const AuthProvider = ({ children }: PropType) => {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (error) {
      toast.error(error);
      // console.log(error);
    }
  }, [error]);
  const login = async (user: User) => {
    setError("");
    setUser("");
    try {
      const response = await axios.post("/api/auth/login", user);
      if (response.data.userToken) {
        router.push("/");
        setUser(user.username);
        toast.success(response.data.message);
        // console.log(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
