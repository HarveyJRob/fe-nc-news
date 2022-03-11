// React
import { useState, useEffect, useContext } from "react";

// fortawesome
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosPatchCommentByCommentId } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Components
import { ErrorPage } from "./ErrorPage";

const CommentVotes = ({ comment, commentsList, setCommentsList }) => {
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    if (comment.author === loggedInUser || hasVoted) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [comment, loggedInUser, setIsDisabled]);

  const handleVotes = (increment) => {
    const newCommentsList = commentsList.map((c) => {
      if (c.comment_id === comment.comment_id) {
        const newC = { ...c };
        newC.votes += increment;
        return newC;
      } else {
        return c;
      }
    });
    setCommentsList(newCommentsList);
    setHasVoted(true);
    return axiosPatchCommentByCommentId(comment.comment_id, {
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
      </button>
      {comment.votes}
      <button disabled={isDisabled} onClick={() => handleVotes(-1)}>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsDown} />
      </button>
    </>
  );
};

export default CommentVotes;
