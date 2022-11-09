import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleCard } from './ArticleCard';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeArticles, setHomeArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(null, null, null).then(({ articles }) => {
      setHomeArticles(articles.slice(0, 10));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul className="d-flex flex-wrap justify-content-center gap-3 mt-4">
      {homeArticles.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            className="article-item"
            article={article}
          />
        );
      })}
    </ul>
  );
};
