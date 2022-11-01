import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

export const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleSelection = (event) => {
    event.preventDefault();
    const article_id = event.target.value;
    navigate(`/articles/${article_id}`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://via.placeholder.com/286x180.png" />
      <Card.Body>
        <Card.Title style={{ height: 100 }}>{article.title}</Card.Title>
        <Stack gap={2}>
          <Stack direction="horizontal" gap={3}>
            <Card.Text className="w-50 text-center" style={{ margin: 0 }}>
              comments: {article.comment_count}
            </Card.Text>
            <Card.Text className="w-50 text-center">
              votes: {article.votes}
            </Card.Text>
          </Stack>
          <Button
            variant="primary"
            value={article.article_id}
            onClick={handleSelection}
          >
            Read more
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
