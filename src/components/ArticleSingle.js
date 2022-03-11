import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import CommentsList from "./CommentsList";
import { ErrorPage } from "./ErrorPage";
import Votes from "./Votes";

// fortawesome
import { faComment, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosGetArticleByArticleId } from "../utils/api";
import { formatPSQLDateTimeStamp } from "../utils/utils";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

const ArticleSingle = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    axiosGetArticleByArticleId(article_id)
      .then((ArticleFromApi) => {
        setArticle({ ...ArticleFromApi, created_at: formatPSQLDateTimeStamp(ArticleFromApi.created_at) });
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id]);

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
            <Votes resource={"article"} votes={article.votes} id={article.article_id} author={article.author} /> |{" "}
            {/* <ArticleVotes article={article} setArticle={setArticle} /> |{" "} */}
            <Link to={`/users/${article.author}`}>{article.author}</Link> | {article.created_at} | [
            <Link to={`/articles/${article.topic}`}>{article.topic}</Link>] |{" "}
            {loggedInUser === article.author && <FontAwesomeIcon className="material-icons md-light " icon={faEdit} />}
          </li>
        </ul>

        <p>{article.body}</p>
      </section>
      <CommentsList article_id={article_id} />
    </main>
  );
};

export default ArticleSingle;
