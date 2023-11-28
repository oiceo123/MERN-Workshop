function NavbarComponent() {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item py-3">
          <a href="/" className="nav-link">
            หน้าแรก
          </a>
        </li>
        <li className="nav-item py-3">
          <a href="/create" className="nav-link">
            เขียนบทความ
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
