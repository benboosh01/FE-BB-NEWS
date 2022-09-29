import { ArticleCard } from './ArticleCard';

export const ArticleList = ({ isLoading, articles }) => {
  if (isLoading) return <p>Loading...</p>;
  return (
    <ul className="article-list">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </ul>
  );
};
