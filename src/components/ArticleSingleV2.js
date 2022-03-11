import { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import ArticleVotes from "./ArticleVotes";
import CommentsList from "./CommentsList";
import { ErrorPage } from "./ErrorPage";
import InlineEdit from "./InlineEdit";

// fortawesome
import { faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosGetArticleByArticleId, axiosPatchArticleByArticleId } from "../utils/api";
import { formatPSQLDateTimeStamp } from "../utils/utils";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

const ArticleSingle = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  const isMounted = useRef(false);
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    axiosGetArticleByArticleId(article_id)
      .then((ArticleFromApi) => {
        setArticle({ ...ArticleFromApi, created_at: formatPSQLDateTimeStamp(ArticleFromApi.created_at) });
        setEditBody(ArticleFromApi.body);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id]);

  useEffect(() => {
    if (isMounted.current) {
      axiosPatchArticleByArticleId(article_id, {
        body: editBody,
      }).then((ArticleFromApi) => {
        setArticle({ ...ArticleFromApi, created_at: formatPSQLDateTimeStamp(ArticleFromApi.created_at) });
      });
    } else {
      isMounted.current = true;
    }
  }, [editBody]);

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  if (isLoading) {
    return (
      <main className="main">
        <p>...article is loading</p>
      </main>
    );
  }

  return (
    <main className="main">
      <section className="article-single">
        <h2>{article.title}</h2>
        <ul>
          <li>
            <ArticleVotes article={article} setArticle={setArticle} /> |{" "}
            <Link to={`/users/${article.author}`}>{article.author}</Link> | {article.created_at} | [
            <Link to={`/articles/${article.topic}`}>{article.topic}</Link>] |
            <span className="fa-layers fa-2x fa-fw">
              <FontAwesomeIcon icon={faComment} />
              <span className="fa-layers-counter">{article.comment_count}</span>
            </span>{" "}
            |{" "}
            {loggedInUser === article.author && <FontAwesomeIcon className="material-icons md-light " icon={faEdit} />}
          </li>
        </ul>
        {loggedInUser === article.author ? (
          <p>
            <InlineEdit value={editBody} setValue={setEditBody} />
          </p>
        ) : (
          <p>{article.body}</p>
        )}
      </section>
      <CommentsList article_id={article_id} />
    </main>
  );
};

export default ArticleSingle;
