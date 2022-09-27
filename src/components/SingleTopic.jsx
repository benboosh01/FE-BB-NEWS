import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByTopic } from '../utilities/api';
import { ArticleCard } from './ArticleCard';

export const SingleTopic = () => {
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();

  useEffect(() => {
    getArticlesByTopic(topic_slug).then(({ articles }) => {
      setTopicArticles(articles);
      setIsLoading(false);
    });
  }, [topic_slug]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <ul className="article-list">
      {topicArticles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
};
