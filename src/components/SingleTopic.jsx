import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';
import { ErrorPage } from './ErrorPage';

export const SingleTopic = ({ articles, setArticles, params }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const sortBy = params.sort_by;
    const order = params.order;
    setIsLoading(true);
    getArticles(topic_slug, sortBy, order)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [topic_slug, params.sort_by, params.order, setArticles]);

  if (error) return <ErrorPage message={error} />;
  if (isLoading) return <p>Loading...</p>;
  return (
    <ArticleList
      topic_slug={topic_slug}
      articles={articles}
      isLoading={isLoading}
    />
  );
};
