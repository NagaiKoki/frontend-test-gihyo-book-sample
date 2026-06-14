import { useEffect, useState } from 'react';

type Article = {
  id: number;
  title: string;
  author: string;
};

export const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch('/api/articles');
      const data = await response.json();
      if (active) {
        setArticles(data.articles);
        setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <h1>記事一覧</h1>
      {isLoading ? (
        <div>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              data-testid="skeleton-card"
              style={{ height: 80, background: '#eee', marginBottom: 8 }}
            />
          ))}
        </div>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <span>{article.title}</span>
              <span>{article.author}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
