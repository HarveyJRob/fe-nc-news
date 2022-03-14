// React
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// fortawesome
import { faThumbsUp, faThumbsDown, faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Component
import Votes from "./Votes";

// Images
import football from "../images/football_500px.jpeg";
import cooking from "../images/cooking_500px.jpeg";
import coding from "../images/coding_500px.jpeg";

const ArticleCardHome = ({ article, articlesList }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  let articlePhoto = football;
  if (article.topic === "cooking") {
    articlePhoto = cooking;
  } else if (article.topic === "football") {
    articlePhoto = football;
  } else if (article.topic === "coding") {
    articlePhoto = coding;
  }

  return (
    <li className="article-card">
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
      </p>
    </li>
  );
};

export default ArticleCardHome;
