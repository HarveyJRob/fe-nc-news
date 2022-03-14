// react
import { Link, useLocation } from "react-router-dom";

// Hooks
import { useTopicsList } from "../hooks/useTopicsList";

// components
import { ErrorPage } from "./ErrorPage";

const TopicNav = () => {
  const { topicsList, isLoading, error } = useTopicsList();

  const location = useLocation();

  if (isLoading) {
    return (
      <nav className="main">
        <p>... topic navigation is loading</p>
      </nav>
    );
  }

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  return (
    <nav className="topic-nav">
      <ul>
        <li className={location.pathname === `/articles` ? "active" : "inactive"}>
          <Link to={`/articles`}>all</Link>
        </li>
        {topicsList.map((topic) => {
          return (
            <li
              key={topic.slug}
              className={location.pathname.startsWith(`/articles/${topic.slug}`) ? "active" : "inactive"}
            >
              <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TopicNav;
