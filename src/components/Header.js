// React
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Hooks
import useToggle from "../hooks/useToggle";

// fortawesome
import { faToggleOn, faUserCircle, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosGetUserByUsername } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

const Header = () => {
  const [show, toggleShow] = useToggle();
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosGetUserByUsername(loggedInUser)
      .then((UserFromApi) => {
        setUser(UserFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [loggedInUser]);

  return (
    <header className="header">
      <span className="header-logo">NCN</span>
      <span className="header-icons">
        {loggedInUser ? (
          <Link to={`/users/${user.username}`}>
            <img src={user.avatar_url} width="36" />
          </Link>
        ) : (
          <FontAwesomeIcon className="material-icons md-light md-36" icon={faUserCircle} />
        )}{" "}
        <button onClick={toggleShow}>
          {show ? (
            <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOff} />
          ) : (
            <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOn} />
          )}
        </button>
      </span>
    </header>
  );
};

export default Header;
