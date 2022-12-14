import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://busy-jade-pig-ring.cyclic.app/api/',
});

export const getArticles = (topic, sortBy = 'created_at', order = 'DESC') => {
  return newsApi
    .get('articles', {
      params: { topic: topic, sort_by: sortBy, order: order },
    })
    .then((res) => {
      return res.data;
    });
};

export const getArticle = (article_id) => {
  return newsApi.get(`articles/${article_id}`).then((res) => {
    return res.data;
  });
};

export const getArticleComments = (article_id) => {
  return newsApi.get(`articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
};

export const getTopics = () => {
  return newsApi.get(`topics`).then((res) => {
    return res.data;
  });
};

export const patchArticleVotes = (article_id, votes) => {
  return newsApi.patch(`articles/${article_id}`, votes).then((res) => {
    return res.data;
  });
};

export const postArticleComment = (article_id, comment) => {
  return newsApi
    .post(`articles/${article_id}/comments`, comment)
    .then((res) => {
      return res.data;
    });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`comments/${comment_id}`).then((res) => {
    return res.data;
  });
};
