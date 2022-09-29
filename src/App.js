import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { SingleArticle } from './components/SingleArticle';
import { MainNav } from './components/MainNav';
import { SingleTopic } from './components/SingleTopic';
import { useState } from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState('');
  const [params, setParams] = useState({});
  const [sort, setSort] = useState({ value: '', text: 'Sort' });
  const [order, setOrder] = useState({ value: '', text: 'Order' });

  return (
    <div className="App">
      <Header />
      <MainNav topic={topic} setTopic={setTopic} />
      <Routes>
        <Route
          path="/"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              setParams={setParams}
              params={params}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/articles"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              setParams={setParams}
              params={params}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route
          path="/:topic_slug/articles"
          element={
            <SingleTopic
              articles={articles}
              setArticles={setArticles}
              setParams={setParams}
              params={params}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/*"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              setParams={setParams}
              params={params}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
