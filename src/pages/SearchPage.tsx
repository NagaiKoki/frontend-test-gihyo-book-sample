import { useState } from 'react';

export const SearchPage = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <main>
      <h1>検索</h1>
      <input
        type="search"
        placeholder="キーワードを入力"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </main>
  );
};
