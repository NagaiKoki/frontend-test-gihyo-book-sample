import { useState } from 'react';

export const FormPage = () => {
  const [prefecture, setPrefecture] = useState('');

  return (
    <main>
      <h1>フォーム</h1>
      <div>
        <label htmlFor="prefecture">都道府県</label>
        <select
          id="prefecture"
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="hokkaido">北海道</option>
          <option value="tokyo">東京都</option>
          <option value="osaka">大阪府</option>
        </select>
      </div>
    </main>
  );
};
