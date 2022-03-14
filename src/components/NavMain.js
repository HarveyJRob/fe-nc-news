import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavMain = () => {
  const location = useLocation();

  return (
    <nav className="nav-main">
      <ul>
        <li className={location.pathname === "/" ? "active" : "inactive"}>
          <Link to="/">HOME</Link>
        </li>
        <li className={location.pathname.startsWith("/article") ? "active" : "inactive"}>
          <Link to="/articles">ARTICLES</Link>
        </li>
        <li className={location.pathname.startsWith("/user") ? "active" : "inactive"}>
          <Link to="/users">USERS</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : "inactive"}>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMain;
