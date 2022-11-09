import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';
import { ErrorPage } from './ErrorPage';

export const SingleTopic = ({ articles, setArticles, sort, order }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic_slug, sort, order)
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [topic_slug, sort, order, setArticles]);

  if (error) return <ErrorPage message={error} />;
  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <ArticleList
        topic_slug={topic_slug}
        articles={articles}
        isLoading={isLoading}
      />
    </section>
  );
};
