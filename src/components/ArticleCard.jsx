import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import * as Icon from 'react-bootstrap-icons';

export const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleSelection = (event) => {
    event.preventDefault();
    const article_id = event.target.value;
    navigate(`/articles/${article_id}`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      {article.topic === 'coding' ? (
        <Card.Img
          variant="top"
          style={{ maxHeight: '190px' }}
          src="https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg"
        />
      ) : article.topic === 'cooking' ? (
        <Card.Img
          variant="top"
          style={{ maxHeight: '190px' }}
          src="https://cdn.pixabay.com/photo/2017/01/14/10/57/woman-1979272_1280.jpg"
        />
      ) : (
        <Card.Img
          variant="top"
          style={{ maxHeight: '190px' }}
          src="https://cdn.pixabay.com/photo/2016/06/15/01/11/soccer-1457988_1280.jpg"
        />
      )}

      <Card.Body>
        <Card.Title style={{ height: 100 }}>{article.title}</Card.Title>
        <Stack gap={2}>
          <Stack direction="horizontal" gap={1}>
            <Icon.Chat size={20} className="text-primary" />
            <Card.Text className="text-center small" style={{ margin: 0 }}>
              {article.comment_count}
            </Card.Text>
            <div className="d-flex">
              <Icon.HandThumbsUp color="green" size={20} />
              <Card.Text className="w-50 text-center small">
                {article.votes}
              </Card.Text>
            </div>
          </Stack>
          <Button
            variant="outline-primary"
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
