import { Link } from "react-router-dom";

// fortawesome
import { faThumbsUp, faThumbsDown, faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Images
import football from "../images/football_500px.jpeg";
import cooking from "../images/cooking_500px.jpeg";
import coding from "../images/coding_500px.jpeg";

const ArticleCard = ({ article }) => {
  let articlePhoto = football;
  if (article.topic === "cooking") {
    articlePhoto = cooking;
  } else if (article.topic === "football") {
    articlePhoto = football;
  } else if (article.topic === "coding") {
    articlePhoto = coding;
  }

  return (
    <li className="flex-item">
      <h3>
        <Link to={`/article/${article.article_id}`}>{article.title}</Link>
      </h3>
      <img src={articlePhoto} alt="avatar" />
      <p>
        <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faEdit} />{" "}
        <FontAwesomeIcon className="material-icons md-light" icon={faComment} />{" "}
        <span className="fa-layers fa-2x fa-fw">
          <FontAwesomeIcon className="material-icons md-light" icon={faThumbsUp} />{" "}
          <span className="fa-layers-counter">{article.votes}</span>
        </span>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsDown} />{" "}
        <span className="fa-layers fa-2x fa-fw">
          <FontAwesomeIcon icon={faComment} />
          <span className="fa-layers-counter">{article.comment_count}</span>
        </span>
      </p>
    </li>
  );
};

export default ArticleCard;
