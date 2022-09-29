import { ArticleCard } from './ArticleCard';

export const ArticleList = ({
  setParams,
  isLoading,
  articles,
  topic_slug,
  sort,
  setSort,
  order,
  setOrder,
}) => {
  const sortOptions = [
    { value: '', text: 'Sort' },
    { value: 'votes', text: 'Votes' },
    { value: 'comment_count', text: 'Comments' },
    { value: 'created_at', text: 'Date' },
  ];

  const orderOptions = [
    { value: '', text: 'Order' },
    { value: 'ASC', text: 'ASC' },
    { value: 'DESC', text: 'DESC' },
  ];

  const handleSort = (event) => {
    setSort(event.target.value);
    setParams((currParams) => {
      return { ...currParams, sort_by: event.target.value };
    });
  };

  const handleOrder = (event) => {
    setOrder(event.target.value);
    setParams((currParams) => {
      return { ...currParams, order: event.target.value };
    });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <div className="topic-title">
        <h2>
          {topic_slug
            ? `${
                topic_slug[0].toUpperCase() + topic_slug.substring(1)
              } Articles`
            : 'All Articles'}
        </h2>
        <label htmlFor="sort-by">Sort</label>
        <select
          name="sort-columns"
          id="sort-by"
          value={sort}
          onChange={handleSort}
        >
          {sortOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <label htmlFor="order-by">Order</label>
        <select
          name="sort-columns"
          id="order-by"
          value={order}
          onChange={handleOrder}
        >
          {orderOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
      <ul className="article-list">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
