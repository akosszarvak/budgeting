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
          <Link
            to="/"
            className="text-xl font-bold text-blue-800 dark:text-white"
          >
            BudgetBuddy
          </Link>
        </div>
        <div className="w-full">
          {user ? (
            <div className="flex align-middle">
              {/* {" "}
              <span className="w-1/2 align-bottom text-xl">
                Welcome {user.name}!
              </span> */}
              <div className="flex w-full items-center justify-end gap-6 text-lg">
                {" "}
                <Link
                  to="/transactions"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Transactions
                </Link>
                <Link
                  to="/"
                  className="cursor-pointer text-gray-900 hover:text-gray-500 hover:shadow-sm"
                >
                  Dashboard
                </Link>
                <span
                  className="flex items-center gap-2 align-middle   text-gray-900 hover:cursor-pointer  hover:text-gray-500  hover:shadow-sm"
                  onClick={handleClick}
                >
                  <FaSignOutAlt />
                  Log out
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex w-full flex-col justify-end rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0   ">
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
