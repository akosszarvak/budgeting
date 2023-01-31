import { create } from "zustand";
import { authHelpers } from "../api/axios";

const [useAuthStore] = create((set) => ({
  user: {},
  token: "",
  setUserData: (user, token) => set({ user, token }),
  clearUserData: () => set({ user: {}, token: "" }),
  login: async (userData) => {
    try {
      const response = await authHelpers.login(userData);
      const { user, token } = response.data;
      set({ user, token });
      return true;
    } catch (error) {
      return false;
    }
  },
  register: async (userData) => {
    try {
      const response = await authHelpers.register(userData);
      const { user, token } = response.data;
      set({ user, token });
      return true;
    } catch (error) {
      return false;
    }
  },
  logout: () => {
    clearUserData();
    authHelpers.logout();
  },
}));

export default useAuthStore;
