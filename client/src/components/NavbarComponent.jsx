import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item py-3">
          <div className="nav-link">
            <Link to="/">หน้าแรก</Link>
          </div>
        </li>
        <li className="nav-item py-3">
          <div className="nav-link">
            <Link to="/create">เขียนบทความ</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
