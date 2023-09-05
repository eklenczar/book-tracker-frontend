import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import { UserContext } from "./CurrentUserContext";

function Layout({ onLogout }) {
  const user = useContext(UserContext);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div className="layout">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li><Link to="/mybooks">My Books</Link></li>
          <li>
            {user ? (
              <div>
                <p>Welcome, {user.name}!</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
