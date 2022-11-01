import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { SingleArticle } from './components/SingleArticle';
import { MainNav } from './components/MainNav';
import { SingleTopic } from './components/SingleTopic';
import { useState } from 'react';
import { ArticlesTitle } from './components/ArticlesTitle';
import { ErrorPage } from './components/ErrorPage';
import { Home } from './components/Home';

function App() {
  const [articles, setArticles] = useState([]);
  const [params, setParams] = useState({});
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('DESC');

  return (
    <div className="App">
      <Header />
      <MainNav />
      <ArticlesTitle
        setParams={setParams}
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
                params={params}
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
                params={params}
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
