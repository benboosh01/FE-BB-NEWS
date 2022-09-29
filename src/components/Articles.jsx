import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';

export const Articles = ({ articles, setArticles, params }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sortBy = params.sort_by;
    const order = params.order;
    setIsLoading(true);
    getArticles(null, sortBy, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [setArticles, params]);

  return (
    <section>
      <ArticleList articles={articles} isLoading={isLoading} />
    </section>
  );
};
