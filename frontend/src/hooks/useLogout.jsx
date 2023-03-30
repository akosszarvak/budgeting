import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext();
  const logout = () => {
    //remove user from localstorage
    localStorage.removeItem("user");

    //dispatch logout function
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
