import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authHelpers } from "../api/axios";

function Header() {
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    authHelpers.logout();
    navigate("/login");
  };
  return (
    <header className="">
      Header
      <div className="logo">
        <Link to="/">BudgetBuddy</Link>
      </div>
      <ul>
        {/* {user ? (
          <>
            {" "}
            <button onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : ( */}
        <>
          <>
            {" "}
            <button onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </>
          <li>
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
        {/* )} */}
      </ul>
    </header>
  );
}

export default Header;
