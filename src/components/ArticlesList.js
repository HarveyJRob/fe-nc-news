// React
import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// fortawesome
import { faEdit, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// Hooks
import useToggle from "../hooks/useToggle";

// Components
import ArticleCard from "./ArticleCard";
import TopicNav from "./TopicNav";
import SortNav from "./SortNav";
import { ErrorPage } from "./ErrorPage";
import ArticleAdd from "./ArticleAdd";
import TopicAdd from "./TopicAdd";

// Utils
import { axiosGetArticlesByTopic } from "../utils/api";

const ArticlesList = () => {
  const [show, toggleShow] = useToggle();
  const [showTopicAdd, toggleShowTopicAdd] = useToggle();
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [articlesList, setArticlesList] = useState([]);

  //const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const { topic } = useParams();

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    axiosGetArticlesByTopic(
      topic,
      search.get("sortOrder"),
      search.get("sortBy"),
      search.get("page"),
      search.get("limit")
    )
      .then((articlesFromApi) => {
        setArticlesList([...articlesFromApi.articles]);
        setTotalCount(articlesFromApi.total_count);
        //setPage(articlesFromApi.page);
        setPageCount(articlesFromApi.pageCount);
        setError(null);
        setIsLoading(false);
        if (isReloading) {
          setIsReloading(false);
        }
      })
      .catch((err) => {
        setError({ err });
        setIsLoading(false);
      });
  }, [topic, search]);

  if (isLoading) {
    return (
      <main className="main">
        <h2>Article List</h2>
        <p>...article list is loading</p>
      </main>
    );
  }

  if (error) {
    return <ErrorPage message={error.err.response.data.msg} status={error.err.response.status} />;
  }

  return (
    <main className="main">
      {loggedInUser && (
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

      {loggedInUser && (
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

      <TopicNav />

      <SortNav pageCount={pageCount} />

      <ul className="articles-list">
        {articlesList.map((article) => {
          return (
            <ArticleCard
              key={article.title}
              article={article}
              articlesList={articlesList}
              setArticlesList={setArticlesList}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default ArticlesList;
