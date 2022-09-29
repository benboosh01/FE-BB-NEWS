import { ArticleCard } from './ArticleCard';

export const ArticleList = ({ isLoading, articles, topic_slug }) => {
  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <h2 className="topic-title">
        {topic_slug
          ? `${topic_slug[0].toUpperCase() + topic_slug.substring(1)} Articles`
          : 'All Articles'}
      </h2>
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};