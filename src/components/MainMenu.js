import React from "react";
import { Link, useLocation } from "react-router-dom";

const MainMenu = () => {
  const location = useLocation();

  console.log(location);
  return (
    <nav className="nav-main">
      <ul className="navigation">
        <li className={location.pathname === "/" ? "nav-active" : "nav-inactive"}>
          <Link to="/">HOME</Link>
        </li>
        <li className={location.pathname.startsWith("/article") ? "nav-active" : "nav-inactive"}>
          <Link to="/articles">ARTICLES</Link>
        </li>
        <li className={location.pathname.startsWith("/user") ? "nav-active" : "nav-inactive"}>
          <Link to="/users">USERS</Link>
        </li>
        <li className={location.pathname === "/about" ? "nav-active" : "nav-inactive"}>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
