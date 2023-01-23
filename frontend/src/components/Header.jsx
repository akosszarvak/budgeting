import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="">
      Header
      <div className="logo">
        <Link to="/">BudgetBuddy</Link>
      </div>
      <ul>
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
      </ul>
    </header>
  );
}

export default Header;
