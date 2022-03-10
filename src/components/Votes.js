// React
import { useState, useEffect, useContext } from "react";

// fortawesome
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosPatchCommentByCommentId, axiosPatchArticleByArticleId } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Components
import { ErrorPage } from "./ErrorPage";

const Votes = ({ resource, votes, id, author }) => {
  const [increment, setIncrement] = useState(0);
  const [error, setError] = useState(null);
  const { loggedInUser } = useContext(LoggedInUserContext);

  const handleIncrement = (increment) => {
    setIncrement((currIncrement) => {
      return currIncrement + increment;
    });
    let apiPatchRequest;

    if (resource === "comment") {
      apiPatchRequest = axiosPatchCommentByCommentId(id, {
        inc_votes: increment,
      });
    } else if (resource === "article") {
      apiPatchRequest = axiosPatchArticleByArticleId(id, {
        inc_votes: increment,
      });
    }

    return apiPatchRequest.catch((err) => {
      setIncrement((currIncrement) => {
        return currIncrement - increment;
      });
      setError(err);
    });
  };

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  return (
    <>
      <button disabled={increment > 0 || loggedInUser === author} onClick={() => handleIncrement(1)}>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsUp} />
      </button>
      {votes + increment}
      <button disabled={increment < 0 || loggedInUser === author} onClick={() => handleIncrement(-1)}>
        <FontAwesomeIcon className="material-icons md-light" icon={faThumbsDown} />
      </button>
    </>
  );
};

export default Votes;
