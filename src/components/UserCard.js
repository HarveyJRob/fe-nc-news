import { Link } from "react-router-dom";

// fortawesome
import { faThumbsUp, faThumbsDown, faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = ({ user }) => {
  return (
    <li className="user-card">
      <h3>
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </h3>
      {/* <img src="https://thispersondoesnotexist.com/image" alt="avatar" /> */}
      <p></p>
    </li>
  );
};

export default UserCard;
