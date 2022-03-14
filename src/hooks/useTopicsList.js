// react
import { useState, useEffect } from "react";

// utils
import { axiosGetTopics } from "../utils/api";

export const useTopicsList = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosGetTopics()
      .then((topicsFromApi) => {
        setTopicsList(topicsFromApi);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

  return { topicsList, isLoading, error };
};
