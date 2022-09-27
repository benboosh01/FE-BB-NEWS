import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticle, getArticleComments } from '../utilities/api';
import { CommentCard } from './CommentCard';
import axios from 'axios';

export const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    axios.all([getArticle(article_id), getArticleComments(article_id)]).then(
      axios.spread((...allData) => {
        setArticle(allData[0].article);
        setComments(allData[1].comments);
      })
    );
  }, [article_id]);

  return (
    <section className="article-card-single">
      <div className="single-article-container">
        <div className="single-article-title">
          <h2>{article.title}</h2>
        </div>
        <div className="single-inner-container">
          <p>author: {article.author}</p>
          {/* <p>{article.created_at.slice(0, 10)}</p> */}
          <p>{article.created_at}</p>
          <a href="#comments-list">comments: {article.comment_count}</a>
          <p>{article.body}</p>
        </div>
      </div>
      <div className="article-comments-container">
        <div className="comments-title">
          <h3>Comments</h3>
        </div>
        <ul className="comments-list" id="comments-list">
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </div>
    </section>
  );
};
