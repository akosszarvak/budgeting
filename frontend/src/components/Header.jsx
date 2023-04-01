import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    queryClient.removeQueries(["ledgers"]);
    toast.success("Logout succesful!");

    navigate("/login");
  };

  return (
    <nav className="mx-auto  w-full">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <div className="flex">
          <Link to="/" className="text-xl font-semibold dark:text-white">
            BudgetBuddy
          </Link>
        </div>
        <div className="w-full">
          {user ? (
            <div className="flex align-middle">
              {" "}
              <span className="w-1/2 align-bottom text-xl">
                Welcome {user.name}!
              </span>
              <div className="flex w-full items-center justify-end gap-6 text-lg">
                {" "}
                <Link
                  to="/login"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Transactions
                </Link>
                <Link
                  to="/login"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Categories
                </Link>
                <button
                  className="gap flex h-4/5 items-center rounded-lg bg-blue-500 p-1 px-2 align-middle text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
                  onClick={handleClick}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex w-full flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0   ">
              <div className="py-2">
                <Link
                  to="/login"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Login
                </Link>
              </div>
              <div className="py-2">
                <Link
                  to="/register"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
