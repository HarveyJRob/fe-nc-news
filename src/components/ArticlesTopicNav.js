import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosGetTopics } from "../utils/api";

const ArticlesTopicNav = ({ topic, setTopic }) => {
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    axiosGetTopics().then((topicsFromApi) => {
      setTopicsList(topicsFromApi);
    });
  }, []);

  return (
    <nav>
      <ul className="navigation">
        <li>
          <Link to={`/articles`}>all</Link>
        </li>
        {topicsList.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ArticlesTopicNav;
