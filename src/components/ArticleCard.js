// React
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// fortawesome
import { faThumbsUp, faThumbsDown, faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosDeleteArticleByArticleId } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Components
import Votes from "./Votes";

// Images
import football from "../images/football_500px.jpeg";
import cooking from "../images/cooking_500px.jpeg";
import coding from "../images/coding_500px.jpeg";

const ArticleCard = ({ article, articlesList, setArticlesList }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [error, setError] = useState(null);

  let articlePhoto = football;
  if (article.topic === "cooking") {
    articlePhoto = cooking;
  } else if (article.topic === "football") {
    articlePhoto = football;
  } else if (article.topic === "coding") {
    articlePhoto = coding;
  }

  const handleDelete = (article_id) => {
    setArticlesList((currArticlesList) => {
      return [...currArticlesList].filter((article) => {
        return article.article_id !== article_id;
      });
    });
    return axiosDeleteArticleByArticleId(article_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <li className="flex-item">
      <h3>
        <Link to={`/article/${article.article_id}`}>{article.title}</Link>
      </h3>
      <img src={articlePhoto} alt="avatar" />
      <p>
        <Votes resource="article" votes={article.votes} id={article.article_id} author={article.author} />
        <Link to={`/article/${article.article_id}`}>
          <span className="fa-layers fa-2x fa-fw">
            <FontAwesomeIcon className="material-icons md-light md-24" icon={faComment} />
            <span className="fa-layers-counter">{article.comment_count}</span>
          </span>
        </Link>{" "}
        {loggedInUser === article.author && (
          <button disabled={article.comment_count !== "0"} onClick={() => handleDelete(article.article_id)}>
            <FontAwesomeIcon className="material-icons md-light md-16" icon={faTrashAlt} />
          </button>
        )}
      </p>
    </li>
  );
};

export default ArticleCard;
