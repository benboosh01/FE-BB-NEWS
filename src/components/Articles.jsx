import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleCard } from './ArticleCard';

export const Articles = ({ articles, setArticles }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <div className="topic-title">
        <h2>All Topics</h2>
      </div>
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
