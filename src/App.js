import './stylesheets/App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { SingleArticle } from './components/SingleArticle';
import { Nav } from './components/Nav';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
