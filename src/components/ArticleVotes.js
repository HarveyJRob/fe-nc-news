// React
import { useState, useEffect, useContext } from "react";

// fortawesome
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosPatchArticleByArticleId } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Components
import { ErrorPage } from "./ErrorPage";

const ArticleVotes = ({ article, setArticle }) => {
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    if (article.author === loggedInUser || hasVoted) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [article, loggedInUser, hasVoted]);

  const handleVotes = (increment) => {
    setArticle((currArticle) => {
      const newArticle = { ...currArticle };
      newArticle.votes += increment;
      return newArticle;
    });
    setHasVoted(true);
    return axiosPatchArticleByArticleId(article.article_id, {
      inc_votes: increment,
    }).catch((err) => {
      setError(err);
    });
  };

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  return (
    <>
      <button disabled={isDisabled} onClick={() => handleVotes(1)}>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsUp} />
      </button>{" "}
      {article.votes}{" "}
      <button disabled={isDisabled} onClick={() => handleVotes(-1)}>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsDown} />
      </button>
    </>
  );
};

export default ArticleVotes;
