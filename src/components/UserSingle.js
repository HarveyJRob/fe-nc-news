import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Utils
import { axiosGetUserByUsername, axiosGetArticlesByUsername, axiosGetCommentsByUsername } from "../utils/api";
import { formatPSQLDateTimeStamp } from "../utils/utils";

// fortawesome
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import CollapseWrapper from "./CollapseWrapper";
import { ErrorPage } from "./ErrorPage";

const UserSingle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      })
      .catch((err) => {
        setError({ err });
      });
  }, [username]);

  useEffect(() => {
    axiosGetCommentsByUsername(username)
      .then((CommentsFromApi) => {
        setUserComments(CommentsFromApi);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [username]);

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
        <h2>
          {user.name} ({user.username})
        </h2>
        <img src={user.avatar_url} alt="user avatar" />
      </section>
      <h3>Authored articles</h3>
      <CollapseWrapper>
        <ol>
          {userArticles.map((article) => {
            let formattedDate = formatPSQLDateTimeStamp(article.created_at);
            return (
              <li key={article.article_id}>
                {article.topic}: {article.title} ({formattedDate}) -{" "}
                <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />{" "}
                <FontAwesomeIcon className="material-icons md-light" icon={faEdit} />
              </li>
            );
          })}
        </ol>
      </CollapseWrapper>
      <h3>Authored comments</h3>
      <CollapseWrapper>
        <ol>
          {userComments.map((comment) => {
            let formattedDate = formatPSQLDateTimeStamp(comment.created_at);
            return (
              <li key={comment.comment_id}>
                {comment.article_title} by {comment.article_author}:<br /> {comment.body} ({formattedDate}) -{" "}
                <FontAwesomeIcon className="material-icons md-light" icon={faTrashAlt} />{" "}
              </li>
            );
          })}
        </ol>
      </CollapseWrapper>
    </main>
  );
};

export default UserSingle;
