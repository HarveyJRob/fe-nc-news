// React
import { useState, useEffect } from "react";

// Utils
import { axiosGetArticlesByTopic } from "../utils/api";

export const useArticlesList = (topic = undefined, sortOrder = "DESC", sortBy = "created_at", page = 1, limit = 10) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    axiosGetArticlesByTopic(topic, sortOrder, sortBy, page, limit)
      .then((articlesFromApi) => {
        setArticlesList([...articlesFromApi.articles]);
        setTotalCount(articlesFromApi.total_count);
        setPageCount(articlesFromApi.pageCount);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  return { articlesList, isLoading, error, totalCount, page, pageCount };
};
