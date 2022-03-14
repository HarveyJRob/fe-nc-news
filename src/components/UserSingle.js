import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

// Utils
import {
  axiosGetUserByUsername,
  axiosGetArticlesByUsername,
  axiosGetCommentsByUsername,
  axiosDeleteArticleByArticleId,
  axiosDeleteCommentByCommentId,
} from "../utils/api";
import { displayCreatedAt } from "../utils/utils";

// fortawesome
import { faEdit, faComment, faTrashAlt, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Hooks
import useToggle from "../hooks/useToggle";

// Components
import CollapseWrapper from "./CollapseWrapper";
import { ErrorPage } from "./ErrorPage";
import ArticleAdd from "./ArticleAdd";
import TopicAdd from "./TopicAdd";
import Votes from "./Votes";

const UserSingle = () => {
  const [show, toggleShow] = useToggle();
  const [showTopicAdd, toggleShowTopicAdd] = useToggle();
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    axiosGetUserByUsername(username)
      .then((UserFromApi) => {
        setUser(UserFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [username]);

  useEffect(() => {
    axiosGetArticlesByUsername(username)
      .then((ArticlesFromApi) => {
        setUserArticles(ArticlesFromApi);
        if (isReloading) {
          setIsReloading(false);
        }
      })
      .catch((err) => {
        setError({ err });
      });
  }, [username, isReloading]);

  useEffect(() => {
    axiosGetCommentsByUsername(username)
      .then((CommentsFromApi) => {
        setUserComments(CommentsFromApi);
        if (isReloading) {
          setIsReloading(false);
        }
      })
      .catch((err) => {
        setError({ err });
      });
  }, [username, isReloading]);

  const handleDelete = (article_id) => {
    setUserArticles((currUserArticles) => {
      return [...currUserArticles].filter((article) => {
        return article.article_id !== article_id;
      });
    });
    return axiosDeleteArticleByArticleId(article_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleCommentDelete = (comment_id) => {
    setUserComments((currUserComments) => {
      return [...currUserComments].filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    return axiosDeleteCommentByCommentId(comment_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  if (isLoading) {
    return (
      <main className="main">
        <p>...user is loading</p>
      </main>
    );
  }

  return (
    <main className="main">
      <section className="userProfile">
        <img src={user.avatar_url} alt="user avatar" />
        <h2>
          {user.name} ({user.username})
        </h2>

        {loggedInUser === user.username && (
          <p>
            Add an article:{" "}
            <button className="article-add-toggle" onClick={toggleShow}>
              {show ? (
                <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOff} />
              ) : (
                <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOn} />
              )}
            </button>
          </p>
        )}
        {show && <ArticleAdd setIsReloading={setIsReloading} />}

        {loggedInUser === user.username && (
          <p>
            Add a topic:{" "}
            <button className="topic-add-toggle" onClick={toggleShowTopicAdd}>
              {showTopicAdd ? (
                <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOff} />
              ) : (
                <FontAwesomeIcon className="material-icons md-light fa-2x" icon={faToggleOn} />
              )}
            </button>
          </p>
        )}
        {showTopicAdd && <TopicAdd setIsReloading={setIsReloading} />}
      </section>
      <section className="user-articles">
        <h3>Authored articles ({userArticles.length})</h3>
        <CollapseWrapper>
          {userArticles.map((article) => {
            return (
              <ul key={article.article_id}>
                <li>
                  <Votes resource={"article"} votes={article.votes} id={article.article_id} author={article.author} /> |{" "}
                  <Link to={`/articles/${article.topic}`}> {article.topic} </Link> | [
                  {displayCreatedAt(article.created_at)}] -{" "}
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
                  <br />
                  <Link to={`/article/${article.article_id}`}>{article.title}</Link>
                </li>
              </ul>
            );
          })}
        </CollapseWrapper>
      </section>
      <section className="user-comments">
        <h3>Authored comments ({userComments.length})</h3>
        <CollapseWrapper>
          {userComments.map((comment) => {
            return (
              <ul key={comment.comment_id}>
                <li>
                  <Votes resource={"comment"} votes={comment.votes} id={comment.comment_id} author={comment.author} /> |{" "}
                  [{displayCreatedAt(comment.created_at)}]{" "}
                  {loggedInUser === comment.author && (
                    <button onClick={() => handleCommentDelete(comment.comment_id)}>
                      <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />
                    </button>
                  )}
                  <br />
                  <Link to={`/article/${comment.article_id}`}>{comment.article_title}</Link> by{" "}
                  <Link to={`/users/${comment.article_author}`}>{comment.article_author}</Link>
                  <p>{comment.body}</p>
                </li>
              </ul>
            );
          })}
        </CollapseWrapper>
      </section>
    </main>
  );
};

export default UserSingle;
