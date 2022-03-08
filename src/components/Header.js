import React from "react";

// fortawesome
import { faToggleOn, faUserCircle, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="header">
      <span className="header-logo">NCN</span>
      <span className="header-icons">
        <FontAwesomeIcon className="material-icons md-light" icon={faUserCircle} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faToggleOff} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faToggleOn} />
      </span>
    </header>
  );
};

export default Header;
