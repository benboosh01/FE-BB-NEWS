import { useNavigate } from 'react-router-dom';

export const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleSelection = (event) => {
    event.preventDefault();
    const article_id = event.target.value;
    navigate(`/articles/${article_id}`);
  };

  return (
    <li className="article-card">
      <h2 className="card-title">{article.title}</h2>
      <div className="article-container">
        <p>{article.author}</p>
        <p>{article.created_at.slice(0, 10)}</p>
        <button
          value={article.article_id}
          onClick={handleSelection}
          className="article-select"
        >
          Read more
        </button>
      </div>
    </li>
  );
};
