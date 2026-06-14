import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (active) {
        setProducts(data.products);
        setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <h1>商品一覧</h1>
      {isLoading ? (
        <div data-testid="loading-spinner">読み込み中...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}（{product.price}円）
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
