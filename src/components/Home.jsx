import { useState, useEffect } from "react";
import { getArticles } from "../utilities/api";
import { ArticleCard } from "./ArticleCard";
import { Loading } from "./Loading";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeArticles, setHomeArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(null, null, null).then(({ articles }) => {
      setHomeArticles(articles.slice(0, 10));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section>
      <h2 className="text-center mt-4 mb-4">Latest Articles</h2>
      <ul className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        {homeArticles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              className="article-item"
              article={article}
            />
          );
        })}
      </ul>
    </section>
  );
};
