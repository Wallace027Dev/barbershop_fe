import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "../interfaces/IUser";

interface AuthState {
  token: string | null;
  user: IUser | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")!)
    : null,

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, user: jwtDecode(token) });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  }
}));
