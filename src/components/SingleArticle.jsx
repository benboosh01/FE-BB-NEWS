import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  getArticle,
  getArticleComments,
  patchArticleVotes,
  postArticleComment,
} from '../utilities/api';
import { CommentCard } from './CommentCard';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/User';

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    axios.all([getArticle(article_id), getArticleComments(article_id)]).then(
      axios.spread((...allData) => {
        setArticle(allData[0].article);
        setComments(allData[1].comments);
        setIsLoading(false);
      })
    );
  }, [article_id]);

  const handleVote = (event) => {
    const article_id = event.target.value;
    const vote = event.target.id;
    if (vote === 'vote-up') {
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes + 1 };
      });
      patchArticleVotes(article_id, { inc_votes: 1 }).catch((err) => {
        setArticle((currArticle) => {
          return { ...currArticle, votes: currArticle.votes - 1 };
        });
      });
    } else {
      patchArticleVotes(article_id, { inc_votes: -1 }).catch((err) => {
        setArticle((currArticle) => {
          return { ...currArticle, votes: currArticle.votes + 1 };
        });
      });
      setArticle((currArticle) => {
        return { ...currArticle, votes: currArticle.votes - 1 };
      });
    }
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleComment = (event) => {
    event.preventDefault();
    setDisable(true);
    postArticleComment(article_id, {
      username: loggedInUser.username,
      body: newComment,
    })
      .then(({ comment }) => {
        setComments((currComments) => {
          return [comment, ...currComments];
        });
      })
      .then(() => {
        setNewComment('');
        setDisable(false);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="article-card-single">
      <div className="single-article-container">
        <div className="single-article-title">
          <h2>{article.title}</h2>
        </div>
        <div className="single-inner-container">
          <p>author: {article.author}</p>
          <p>{article.created_at.slice(0, 10)}</p>
          <a href="#comments-list">comments: {article.comment_count}</a>
          <p>{article.body}</p>
          <div>
            <p>{article.votes}</p>
            <Button
              variant="danger"
              value={article.article_id}
              onClick={handleVote}
              id="vote-down"
            >
              Down
            </Button>
            <Button
              variant="success"
              value={article.article_id}
              onClick={handleVote}
              id="vote-up"
            >
              Up
            </Button>
          </div>
        </div>
      </div>
      <div className="article-comments-container">
        <div className="comments-title">
          <h3>Comments</h3>
        </div>
        <form action="submit" className="comment-form" onSubmit={handleComment}>
          <label htmlFor="add-comment">Add Comment:</label>
          <textarea
            id="add-comment"
            rows={5}
            onChange={handleChange}
            value={newComment}
            required
          />
          <button
            className="comment-btn"
            type="submit"
            id="comment-btn"
            disabled={disable}
          >
            Submit
          </button>
        </form>
        <hr className="comment-form-divider" />
        <ul className="comments-list" id="comments-list">
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </div>
    </section>
  );
};
