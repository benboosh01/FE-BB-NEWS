import { useState, useEffect } from 'react';
import { getArticles } from '../utilities/api';
import { ArticleCard } from './ArticleCard';

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      setArticles(articles);
    });
  }, []);

  return (
    <ul className="article-list">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
};
