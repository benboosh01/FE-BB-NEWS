import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-link">
        All Articles
      </Link>
      <Link className="nav-link" to="/">
        Topics
      </Link>
    </nav>
  );
};
