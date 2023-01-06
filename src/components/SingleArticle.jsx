import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  getArticle,
  getArticleComments,
  patchArticleVotes,
  postArticleComment,
} from "../utilities/api";
import { CommentCard } from "./CommentCard";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { UserContext } from "../contexts/User";
import { ErrorPage } from "./ErrorPage";
import * as Icon from "react-bootstrap-icons";
import { Loading } from "./Loading";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .all([getArticle(article_id), getArticleComments(article_id)])
      .then(
        axios.spread((...allData) => {
          setArticle(allData[0].article);
          setComments(allData[1].comments);
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
    if (vote === "vote-up") {
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
        setNewComment("");
        setDisable(false);
      });
  };

  if (error) return <ErrorPage message={error} />;
  if (isLoading) return <Loading />;

  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <div
        style={{ maxWidth: "768px" }}
        className="d-flex flex-column justify-content-center flex-md-row border rounded"
      >
        <div className="d-flex flex-column align-items-center">
          <div className="p-4 d-flex flex-column gap-2">
            <h2 className="border-bottom py-3 ps-2 bg-light">
              {article.title}
            </h2>
            <div className="d-flex align-items-center gap-2 border-bottom pb-3">
              <div style={{ width: "50px" }} className="py-1">
                <a
                  href="#comments-list"
                  className="text-decoration-none text-primary"
                >
                  <Icon.Chat size={20} /> {article.comment_count}
                </a>
              </div>
              <p className="m-0 small">{article.author}</p>
              <p className="m-0 small">
                {article.created_at.slice(8, 10) +
                  "/" +
                  article.created_at.slice(5, 7) +
                  "/" +
                  article.created_at.slice(0, 4)}
              </p>
            </div>

            <p className="my-1">{article.body}</p>
            <div>
              <div className="d-flex gap-1">
                <span className="visually-hidden">votes: {article.votes}</span>
                {article.votes >= 0 ? (
                  <div
                    style={{ width: "45px" }}
                    className="d-flex align-items-center py-1 px-2 border rounded bg-success"
                  >
                    <p className="text-white m-0 ps-2">{article.votes}</p>
                  </div>
                ) : (
                  <div
                    style={{ width: "45px" }}
                    className="d-flex align-items-center py-1 px-2 border rounded bg-danger"
                  >
                    <p className="text-white m-0 ps-1">{article.votes}</p>
                  </div>
                )}

                <Button
                  variant="danger"
                  value={article.article_id}
                  onClick={handleVote}
                  id="vote-down"
                >
                  <span className="visually-hidden">vote down</span>
                  <Icon.HandThumbsDown color="white" size={20} />
                </Button>
                <Button
                  variant="success"
                  value={article.article_id}
                  onClick={handleVote}
                  id="vote-up"
                >
                  <span className="visually-hidden">vote up</span>
                  <Icon.HandThumbsUp color="white" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ maxWidth: "768px" }}
        className="d-flex flex-column align-items-center"
      >
        <div className="d-flex flex-column align-items-center border rounded mt-3 p-2">
          <div className="mt-3">
            <h4 className="text-center">Comments</h4>
          </div>
          <form
            action="submit"
            className="d-flex flex-column w-100 gap-2 pb-4 px-3"
            onSubmit={handleComment}
            style={{ maxWidth: "768px" }}
          >
            <label htmlFor="add-comment">Add Comment:</label>
            <textarea
              id="add-comment"
              rows={4}
              onChange={handleChange}
              value={newComment}
              required
              className="border rounded"
            />
            <Button
              className="comment-btn"
              type="submit"
              id="comment-btn"
              disabled={disable}
              style={{ width: "200px" }}
            >
              Post your comment
            </Button>
          </form>
          <ul
            className="m-0 px-3"
            id="comments-list"
            style={{ maxWidth: "768px" }}
          >
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
