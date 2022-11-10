import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/User';
import { useContext } from 'react';
import { deleteComment, getArticleComments } from '../utilities/api';

export const CommentCard = ({ comment, setComments, article_id }) => {
  const { loggedInUser } = useContext(UserContext);

  const handleBtn = (event) => {
    const comment_id = event.target.value;
    const username = event.target.id;
    if (loggedInUser.username === username) {
      setComments((currComments) => {
        currComments.filter((comment) => {
          return comment.comment_id !== parseInt(comment_id);
        });
      });
      deleteComment(comment_id).catch((err) => {
        alert('Comment not deleted, please try again');
        getArticleComments(article_id).then(({ comments }) => {
          setComments(comments);
        });
      });
    }
  };

  return (
    <li className="comment-card">
      <h6>{comment.author}</h6>
      <div className="d-flex justify-content-between align-items-start gap-2">
        <p className="small">{comment.body}</p>
        {loggedInUser.username === comment.author ? (
          <Button
            size="sm"
            variant="outline-danger"
            onClick={handleBtn}
            value={comment.comment_id}
            id={comment.author}
          >
            Del
          </Button>
        ) : (
          false
        )}
      </div>

      <hr />
    </li>
  );
};
