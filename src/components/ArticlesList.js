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
import ArticlesSortNav from "./ArticlesSortNav";
import ArticlesPaginationLimit from "./ArticlesPaginationLimit";

// Utils
import { axiosGetArticlesByTopic } from "../utils/api";

const ArticlesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [sortBy, setSortBy] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const topicFromParams = useParams().topic;
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    setTopic(topicFromParams);
  }, [location]);

  useEffect(() => {
    axiosGetArticlesByTopic(topic, sortOrder, sortBy, page, limit).then((articlesFromApi) => {
      setArticlesList([...articlesFromApi.articles]);
      setTotalCount(articlesFromApi.total_count);
      setPage(articlesFromApi.page);
      setPageCount(articlesFromApi.pageCount);
      setIsLoading(false);
    });
  }, [topic, sortOrder, sortBy, page, limit]);

  console.log(topic, sortOrder, sortBy, page, limit);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePagination = (increment) => {
    setPage((currPage) => {
      return currPage + increment;
    });
  };

  if (isLoading) {
    return (
      <main className="main">
        <h2>Article List</h2>
        <p>...article list is loading</p>
      </main>
    );
  }
  return (
    <main className="main">
      <h2>
        Article List - <FontAwesomeIcon className="material-icons md-light md-24" icon={faEdit} />
      </h2>
      <ArticlesTopicNav topic={topic} setTopic={setTopic} />
      <ArticlesSortNav sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy} />
      <ArticlesPaginationLimit limit={limit} setLimit={setLimit} />

      <Stack spacing={2}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
      </Stack>

      <ul className="flex-container">
        {articlesList.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </ul>
    </main>
  );
};

export default ArticlesList;
