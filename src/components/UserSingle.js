import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Utils
import { axiosGetUserByUsername, axiosGetArticlesByUsername, axiosGetCommentsByUsername } from "../utils/api";

// fortawesome
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import CollapseWrapper from "./CollapseWrapper";

const UserSingle = () => {
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    axiosGetUserByUsername(username).then((UserFromApi) => {
      setUser(UserFromApi);
    });
  }, [username]);

  useEffect(() => {
    axiosGetArticlesByUsername(username).then((ArticlesFromApi) => {
      setUserArticles(ArticlesFromApi);
    });
  }, [username]);

  useEffect(() => {
    axiosGetCommentsByUsername(username).then((CommentsFromApi) => {
      setUserComments(CommentsFromApi);
    });
  }, [username]);

  const formatDate = (created_at) => {
    const newDate = new Date(created_at.replace(" ", "T"));
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };

  return (
    <main className="main">
      <section className="userProfile">
        <h2>
          {user.name} ({user.username})
        </h2>
        <img src={user.avatar_url} alt="user avatar" />
        {/* <UserKudos user={user} setUser={setUser} />
      <UserOrders user={user} setUser={setUser} /> */}
      </section>
      <h3>Authored articles</h3>
      <CollapseWrapper>
        <ol>
          {userArticles.map((article) => {
            let formattedDate = formatDate(article.created_at);
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
            let formattedDate = formatDate(comment.created_at);
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
