import { useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authHelpers } from "../api/axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
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
        {false ? (
          <>
            {" "}
            <button onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <button onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
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
