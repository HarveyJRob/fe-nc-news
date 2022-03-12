// React
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import CollapseWrapper from "./CollapseWrapper";
import { ErrorPage } from "./ErrorPage";
import Votes from "./Votes";
import CommentAdd from "./CommentAdd";

// fortawesome
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// MUI
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Utils
import { axiosGetCommentsByArticleId, axiosDeleteCommentByCommentId } from "../utils/api";
import { formatPSQLDateTimeStamp, displayCreatedAt } from "../utils/utils";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

const CommentsList = ({ article_id }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsList, setCommentsList] = useState([]);
  const [isReloading, setIsReloading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    axiosGetCommentsByArticleId(article_id, page, limit)
      .then((commentsFromApi) => {
        setCommentsList([...commentsFromApi.comments]);
        setTotalCount(commentsFromApi.total_count);
        setPage(commentsFromApi.page);
        setPageCount(commentsFromApi.pageCount);
        setIsLoading(false);
        if (isReloading) {
          setIsReloading(false);
        }
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id, page, limit, isReloading]);

  const handleCommentDelete = (comment_id) => {
    setCommentsList((currCommentsList) => {
      return [...currCommentsList].filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    return axiosDeleteCommentByCommentId(comment_id)
      .then((res) => {
        setIsReloading(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  if (isLoading) {
    return (
      <section className="comments-list">
        <p>...comments are loading</p>
      </section>
    );
  }

  return (
    <section className="comments-list">
      <h3>Comments ({totalCount})</h3>
      <CommentAdd article_id={article_id} setIsReloading={setIsReloading} />
      <CollapseWrapper>
        <Stack spacing={2}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </Stack>
        {commentsList.map((comment) => {
          let formattedDate = displayCreatedAt(comment.created_at);
          return (
            <ul key={comment.comment_id}>
              <li>
                <Votes resource={"comment"} votes={comment.votes} id={comment.comment_id} author={comment.author} /> |{" "}
                <Link to={`/users/${comment.author}`}>{comment.author}</Link> | {displayCreatedAt(comment.created_at)} |
                {loggedInUser === comment.author && (
                  <button onClick={() => handleCommentDelete(comment.comment_id)}>
                    <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />
                  </button>
                )}
              </li>
              <li>{comment.body}</li>
            </ul>
          );
        })}
      </CollapseWrapper>
    </section>
  );
};

export default CommentsList;
