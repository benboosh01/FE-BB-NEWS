import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utilities/api';
import { ArticleList } from './ArticleList';

export const SingleTopic = ({
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
  const { topic_slug } = useParams();

  useEffect(() => {
    const sortBy = params.sort_by;
    const order = params.order;
    console.log(sortBy, order);
    setIsLoading(true);
    getArticles(topic_slug, sortBy, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic_slug, params.sort_by, params.order, setArticles]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ArticleList
      params={params}
      setParams={setParams}
      articles={articles}
      isLoading={isLoading}
      topic_slug={topic_slug}
      sort={sort}
      setSort={setSort}
      order={order}
      setOrder={setOrder}
    />
  );
};
