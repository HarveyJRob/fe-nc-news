import { Link } from "react-router-dom";

// fortawesome
import { faThumbsUp, faThumbsDown, faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = ({ user }) => {
  return (
    <li className="flex-item">
      <h3>
        <Link to={`/users/${user.username}`}>{user.username}</Link>
      </h3>
      <img src="https://thispersondoesnotexist.com/image" alt="avatar" />
      <p>
        <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faEdit} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faComment} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsUp} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsDown} />{" "}
        <span className="fa-layers fa-2x fa-fw">
          <FontAwesomeIcon icon={faComment} />
          <span className="fa-layers-counter">{"7"}</span>
        </span>
      </p>
    </li>
  );
};

export default UserCard;
