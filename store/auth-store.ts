import { create } from "zustand";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  hydrated: boolean;

  login: (user: User) => void;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,

  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
    });
  },

  loadUser: () => {
    const storedUser = localStorage.getItem("user");

    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      hydrated: true,
    });
  },
}));