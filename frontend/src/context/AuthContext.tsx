import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      `${import.meta.env.VITE_URL_AUTH}/auth/login`,
      {
        email,
        password,
      }
    );
    setToken(res.data.access_token);
    localStorage.setItem("token", res.data.access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!token) return;
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
