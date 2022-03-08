import axios from "axios";

const myApi = axios.create({
  baseURL: "https://nc-be-news-project.herokuapp.com/api",
});

// Topics

export const axiosGetTopics = () => {
  return myApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

// Users

export const axiosGetUsers = () => {
  return myApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const axiosGetUserByUsername = (username) => {
  return myApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const axiosGetArticlesByUsername = (username) => {
  return myApi.get(`/users/${username}/articles`).then((res) => {
    return res.data.articles;
  });
};

export const axiosGetCommentsByUsername = (username) => {
  return myApi.get(`/users/${username}/comments`).then((res) => {
    return res.data.comments;
  });
};

// Articles

export const axiosGetArticles = () => {
  return myApi.get("/articles").then((res) => {
    return res.data;
  });
};

export const axiosGetArticleByArticleId = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    console.log(res.data);
    return res.data.article;
  });
};

export const axiosGetArticlesByTopic = (topic, sortOrder, sortBy, page, limit) => {
  return myApi
    .get(`/articles`, {
      params: {
        topic: topic,
        order: sortOrder,
        sort_by: sortBy,
        p: page,
        limit: limit,
      },
    })
    .then((res) => {
      return res.data;
    });
};
