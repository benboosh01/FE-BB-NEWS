import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';

export const Articles = ({
  articles,
  setArticles,
  setParams,
  params,
  sort,
  setSort,
  order,
  setOrder,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sortBy = params.sort_by;
    const order = params.order;
    setIsLoading(true);
    getArticles(null, sortBy, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [params]);

  return (
    <ArticleList
      params={params}
      setParams={setParams}
      articles={articles}
      isLoading={isLoading}
      sort={sort}
      setSort={setSort}
      order={order}
      setOrder={setOrder}
    />
  );
};
