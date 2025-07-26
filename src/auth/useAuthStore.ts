import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: string;
  email: string;
  role?: string;
  exp?: number;
};

interface AuthState {
  token: string | null;
  user: TokenPayload | null;

  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<TokenPayload>(token) : null;

  return {
    token,
    user,

    setToken: (newToken: string) => {
      const decoded = jwtDecode<TokenPayload>(newToken);
      localStorage.setItem("token", newToken);
      set({ token: newToken, user: decoded });
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ token: null, user: null });
    },
  };
});
