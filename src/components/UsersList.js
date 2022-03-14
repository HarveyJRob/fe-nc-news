// React
import { useState, useEffect } from "react";

// fortawesome
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import UserCard from "./UserCard";
import { ErrorPage } from "./ErrorPage";

// Utils
import { axiosGetUsers } from "../utils/api";

const UsersList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosGetUsers()
      .then((usersFromApi) => {
        setUsersList([...usersFromApi]);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError({ err });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main className="main">
        <h2>User List</h2>
        <p>...user list is loading</p>
      </main>
    );
  }

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  return (
    <main className="main">
      <h2>
        User List - <FontAwesomeIcon className="material-icons md-light md-24" icon={faEdit} />
      </h2>
      <ul className="users-list">
        {usersList.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </ul>
    </main>
  );
};

export default UsersList;
