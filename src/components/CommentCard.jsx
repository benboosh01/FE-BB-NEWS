export const CommentCard = ({ comment }) => {
  return (
    <li className="comment-card">
      <h4>{comment.author}</h4>
      <p>{comment.body}</p>
      <hr />
    </li>
  );
};
