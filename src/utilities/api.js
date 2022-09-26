import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://be-bb-news.herokuapp.com/api/',
});

export const getArticles = () => {
  return newsApi.get('/articles').then((res) => {
    return res.data;
  });
};

export const getArticle = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data;
  });
};

export const getArticleComments = (article_id) => {
  return newsApi.get(`articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
};
