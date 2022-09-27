import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { SingleArticle } from './components/SingleArticle';
import { MainNav } from './components/MainNav';
import { Home } from './components/Home';
import { SingleTopic } from './components/SingleTopic';

function App() {
  return (
    <div className="App">
      <Header />
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/:topic_slug/articles" element={<SingleTopic />} />
      </Routes>
    </div>
  );
}

export default App;
