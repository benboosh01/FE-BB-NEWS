import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/User';
import { useContext, useState } from 'react';
import { deleteComment, getArticleComments } from '../utilities/api';

export const CommentCard = ({ comment, setComments, article_id }) => {
  const { loggedInUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  const handleBtn = (event) => {
    setDisable(true);
    const comment_id = event.target.value;
    const username = event.target.id;
    if (loggedInUser.username === username) {
      setComments((currComments) => {
        return currComments.filter((comment) => {
          if (comment.comment_id !== parseInt(comment_id)) {
            return comment;
          }
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
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <Button
        variant="danger"
        onClick={handleBtn}
        value={comment.comment_id}
        id={comment.author}
        disabled={loggedInUser.username === comment.author ? disable : true}
      >
        Del
      </Button>
      <hr />
    </li>
  );
};
