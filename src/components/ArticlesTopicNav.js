// react
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// components
import { ErrorPage } from "./ErrorPage";

// utils
import { axiosGetTopics } from "../utils/api";

const ArticlesTopicNav = ({ topic, setTopic }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topicsList, setTopicsList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axiosGetTopics()
      .then((topicsFromApi) => {
        setTopicsList(topicsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  if (isLoading) {
    return (
      <nav className="main">
        <p>... topic navigation is loading</p>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="navigation">
        <li className={location.pathname === `/articles` ? "nav-active" : "nav-inactive"}>
          <Link to={`/articles`}>all</Link>
        </li>
        {topicsList.map((topic) => {
          return (
            <li
              key={topic.slug}
              className={location.pathname.startsWith(`/articles/${topic.slug}`) ? "nav-active" : "nav-inactive"}
            >
              <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ArticlesTopicNav;
