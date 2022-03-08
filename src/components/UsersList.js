// React
import { useState, useEffect } from "react";

// fortawesome
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import UserCard from "./UserCard";

// Utils
import { axiosGetUsers } from "../utils/api";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    axiosGetUsers().then((usersFromApi) => {
      setUsersList([...usersFromApi]);
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
  return (
    <main className="main">
      <h2>
        User List - <FontAwesomeIcon className="material-icons md-light md-24" icon={faEdit} />
      </h2>
      <ul className="flex-container">
        {usersList.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </ul>
    </main>
  );
};

export default UsersList;
