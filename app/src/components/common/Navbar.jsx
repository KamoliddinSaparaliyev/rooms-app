import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/rooms">
          Rooms
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
