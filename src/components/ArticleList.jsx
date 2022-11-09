import { ArticleCard } from './ArticleCard';

export const ArticleList = ({ articles, topic_slug }) => {
  return (
    <section>
      <h2 className="text-center mt-4 mb-4">
        {topic_slug
          ? `${topic_slug[0].toUpperCase() + topic_slug.substring(1)} Articles`
          : 'All Articles'}
      </h2>
      <ul className="d-flex flex-wrap justify-content-center gap-3 ps-0">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
