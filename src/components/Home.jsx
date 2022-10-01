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
    <section className="articles-section">
      <ul className="home-article-list">
        {homeArticles.map((article, i) => {
          return (
            <ArticleCard
              key={article.article_id}
              className="article-item"
              article={article}
            />
          );
        })}
      </ul>
    </section>
  );
};
