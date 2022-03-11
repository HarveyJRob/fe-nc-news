import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <nav className="nav-main">
      <ul className="navigation">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/articles">ARTICLES</Link>
        </li>
        <li>
          <Link to="/users">USERS</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
