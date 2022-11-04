import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  getArticle,
  getArticleComments,
  patchArticleVotes,
  postArticleComment,
  getUsers,
} from '../utilities/api';
import { CommentCard } from './CommentCard';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/User';
import { ErrorPage } from './ErrorPage';
import * as Icon from 'react-bootstrap-icons';

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .all([getArticle(article_id), getArticleComments(article_id), getUsers()])
      .then(
        axios.spread((...allData) => {
          setArticle(allData[0].article);
          setComments(allData[1].comments);
          setUsers(allData[2].users);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [article_id]);

  const handleVote = (event) => {
    const article_id = event.currentTarget.value;
    const vote = event.currentTarget.id;
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

  if (error) return <ErrorPage message={error} />;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <div
        style={{ maxWidth: '576px' }}
        className="d-flex flex-column justify-content-center flex-md-row"
      >
        <div className="d-flex flex-column align-items-center">
          <div className="bg-light p-4 d-flex flex-column gap-3">
            <h2>{article.title}</h2>
            <div
              style={{ width: '80px' }}
              className="border rounded py-2 ps-3 border-primary"
            >
              <a
                href="#comments-list"
                className="text-decoration-none text-primary"
              >
                <Icon.Chat size={25} /> {article.comment_count}
              </a>
            </div>

            <p className="my-1">{article.body}</p>
            <div>
              <div className="d-flex gap-1">
                <span class="visually-hidden">votes: {article.votes}</span>
                {article.votes >= 0 ? (
                  <div
                    style={{ width: '60px' }}
                    className="d-flex align-items-center py-2 px-3 border rounded bg-success"
                  >
                    <p
                      style={{ fontSize: '1.25rem' }}
                      className="text-white m-0 ps-2"
                    >
                      {article.votes}
                    </p>
                  </div>
                ) : (
                  <div
                    style={{ width: '60px' }}
                    className="d-flex align-items-center py-2 px-3 border rounded bg-danger"
                  >
                    <p
                      style={{ fontSize: '1.25rem' }}
                      className="text-white m-0"
                    >
                      {article.votes}
                    </p>
                  </div>
                )}

                <Button
                  variant="danger"
                  value={article.article_id}
                  onClick={handleVote}
                  id="vote-down"
                >
                  <span class="visually-hidden">vote down</span>
                  <Icon.HandThumbsDown color="white" size={30} />
                </Button>
                <Button
                  variant="success"
                  value={article.article_id}
                  onClick={handleVote}
                  id="vote-up"
                >
                  <span class="visually-hidden">vote up</span>
                  <Icon.HandThumbsUp color="white" size={30} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ minWidth: '175px' }}
          className="d-flex flex-column p-4 bg-secondary text-light align-items-center justify-content-end"
        >
          {users.map((user) => {
            if (user.username === article.author) {
              return (
                <img
                  style={{ width: '90px' }}
                  className="rounded-circle"
                  src={user.avatar_url}
                />
              );
            }
          })}
          <p className="mt-4">{article.author}</p>
          <p>
            {article.created_at.slice(8, 10) +
              '/' +
              article.created_at.slice(5, 7) +
              '/' +
              article.created_at.slice(0, 4)}
          </p>
        </div>
      </div>
      <div
        style={{ maxWidth: '576px' }}
        className="d-flex flex-column align-items-center"
      >
        <div className="d-flex flex-column ">
          <div className="mt-3">
            <h3>Comments</h3>
          </div>
          <form
            action="submit"
            className="d-flex flex-column"
            onSubmit={handleComment}
          >
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
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  setComments={setComments}
                  comments={comments}
                  article_id={article_id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
