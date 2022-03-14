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

export const axiosPostTopic = (body) => {
  return myApi.post(`/topics`, body).then((res) => {
    return res.data;
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

export const axiosPostArticle = (body) => {
  return myApi.post(`/articles`, body).then((res) => {
    return res.data;
  });
};

export const axiosGetArticleByArticleId = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const axiosPatchArticleByArticleId = (article_id, body) => {
  return myApi.patch(`/articles/${article_id}`, body).then((res) => {
    return res.data;
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

export const axiosDeleteArticleByArticleId = (article_id) => {
  return myApi.delete(`articles/${article_id}`).then((res) => {
    return res.data;
  });
};

// Comments

export const axiosGetCommentsByArticleId = (article_id, page, limit) => {
  return myApi
    .get(`/articles/${article_id}/comments`, {
      params: {
        p: page,
        limit: limit,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const axiosPostCommentByArticleId = (article_id, body) => {
  return myApi.post(`/articles/${article_id}/comments`, body).then((res) => {
    return res.data;
  });
};

export const axiosPatchCommentByCommentId = (comment_id, body) => {
  return myApi.patch(`/comments/${comment_id}`, body).then((res) => {
    return res.data;
  });
};

export const axiosDeleteCommentByCommentId = (comment_id) => {
  return myApi.delete(`comments/${comment_id}`).then((res) => {
    return res.data;
  });
};
