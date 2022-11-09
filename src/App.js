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
import { SortNav } from './components/SortNav';

function App() {
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('DESC');

  const sortOptions = [
    { value: 'created_at', text: 'Date' },
    { value: 'votes', text: 'Votes' },
    { value: 'comment_count', text: 'Comments' },
  ];

  const orderOptions = [
    { value: 'DESC', text: 'DESC' },
    { value: 'ASC', text: 'ASC' },
  ];

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
              <>
                <SortNav
                  setSort={setSort}
                  setOrder={setOrder}
                  sortOptions={sortOptions}
                  orderOptions={orderOptions}
                />
                <Articles
                  articles={articles}
                  setArticles={setArticles}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                  order={order}
                />
              </>
            }
          />
          <Route path=":article_id" element={<SingleArticle />} />
          <Route
            path="topic/:topic_slug"
            element={
              <>
                <SortNav
                  setSort={setSort}
                  setOrder={setOrder}
                  sortOptions={sortOptions}
                  orderOptions={orderOptions}
                />
                <SingleTopic
                  articles={articles}
                  setArticles={setArticles}
                  order={order}
                  sort={sort}
                />
              </>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
