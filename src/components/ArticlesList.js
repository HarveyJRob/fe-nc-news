// React
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

// fortawesome
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// MUI
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Components
import ArticleCard from "./ArticleCard";
import ArticlesTopicNav from "./ArticlesTopicNav";
import SortNav from "./SortNav";
import PaginationLimit from "./PaginationLimit";
import { ErrorPage } from "./ErrorPage";

// Utils
import { axiosGetArticlesByTopic } from "../utils/api";

const ArticlesList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [sortBy, setSortBy] = useState();
  const [sortByList, setSortByList] = useState(["title", "votes", "topic", "author", "created_at"]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const topicFromParams = useParams().topic;
  const location = useLocation();

  useEffect(() => {
    setTopic(topicFromParams);
  }, [location]);

  useEffect(() => {
    axiosGetArticlesByTopic(topic, sortOrder, sortBy, page, limit)
      .then((articlesFromApi) => {
        setIsLoading(true);
        setArticlesList([...articlesFromApi.articles]);
        setTotalCount(articlesFromApi.total_count);
        setPage(articlesFromApi.page);
        setPageCount(articlesFromApi.pageCount);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [topic, sortOrder, sortBy, page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
      <h2>
        Article List - <FontAwesomeIcon className="material-icons md-light md-24" icon={faEdit} />
      </h2>
      <ArticlesTopicNav topic={topic} setTopic={setTopic} />
      <SortNav
        sortByList={sortByList}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <PaginationLimit limit={limit} setLimit={setLimit} />

      <Stack spacing={2}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
      </Stack>

      <ul className="flex-container">
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
