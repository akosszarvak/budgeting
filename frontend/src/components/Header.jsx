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
    <nav className=" border-grax-200 ">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          >
            BudgetBuddy
          </Link>
        </div>
        <div className="hidden w-full md:block md:w-auto">
          {user ? (
            <>
              {" "}
              <span>Welcome {user.name}!</span>
              <button onClick={handleClick}>
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <div className="mt-4 flex w-full flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0   ">
              <div className="block w-full rounded py-2 pl-3 pr-4 text-gray-700 md:bg-transparent md:hover:text-blue-700">
                <Link
                  to="/login"
                  className="container flex w-full flex-row items-center gap-2"
                >
                  {/* <FaSignInAlt /> */}
                  Login
                </Link>
              </div>
              <div className="block w-full rounded py-2 pl-3 pr-4 text-gray-900 md:bg-transparent md:hover:text-blue-700">
                <Link
                  to="/register"
                  className="container flex w-full flex-row items-center gap-2"
                >
                  {/* <FaUser /> */}
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
