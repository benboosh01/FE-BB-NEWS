import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';

export const Articles = ({ articles, setArticles, order, sort }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles(null, sort, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [order, sort]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <ArticleList articles={articles} />;
    </section>
  );
};
