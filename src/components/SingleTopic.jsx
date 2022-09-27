import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByTopic } from '../utilities/api';
import { ArticleCard } from './ArticleCard';

export const SingleTopic = ({ articles, setArticles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();

  useEffect(() => {
    getArticlesByTopic(topic_slug).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic_slug]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul className="article-list">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
};
