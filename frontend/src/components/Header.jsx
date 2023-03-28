import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    toast.success("Logout succesful!");
    navigate("/login");
  };

  return (
    <header className="">
      Header
      <div className="logo">
        <Link to="/">BudgetBuddy</Link>
      </div>
      <ul>
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
          <>
            <li>
              {/* <button onClick={handleClick}>
                <FaSignOutAlt />
                Logout
              </button> */}
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
              <Link to="/register">
                <FaUser />
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
