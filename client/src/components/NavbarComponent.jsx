import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../services/authenticate";

function NavbarComponent({ history }) {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item py-3">
          <Link to="/" className="nav-link">
            หน้าแรก
          </Link>
        </li>
        <li className="nav-item py-3">
          <Link to="/create" className="nav-link">
            เขียนบทความ
          </Link>
        </li>
        {getUser() ? (
          <li className="nav-item py-3">
            <button
              className="nav-link"
              onClick={() => logout(() => history.push("/"))}
            >
              ออกจากระบบ
            </button>
          </li>
        ) : (
          <li className="nav-item py-3">
            <Link to="/login" className="nav-link">
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default withRouter(NavbarComponent);
