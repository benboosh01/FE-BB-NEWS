import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';
import { Articles } from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { SingleArticle } from './components/SingleArticle';
import { MainNav } from './components/MainNav';
import { SingleTopic } from './components/SingleTopic';
import { useState } from 'react';
import { ErrorPage } from './components/ErrorPage';
import { Home } from './components/Home';

function App() {
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('DESC');

  return (
    <div className="App">
      <MainNav
        sort={sort}
        setSort={setSort}
        order={order}
        setOrder={setOrder}
      />
      <Routes>
        <Route
          path="/"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route path="articles">
          <Route
            index
            element={
              <Articles
                articles={articles}
                setArticles={setArticles}
                sort={sort}
                order={order}
              />
            }
          />
          <Route path=":article_id" element={<SingleArticle />} />
          <Route
            path="topic/:topic_slug"
            element={
              <SingleTopic
                articles={articles}
                setArticles={setArticles}
                order={order}
                sort={sort}
              />
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
