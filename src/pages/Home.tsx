import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main>
      <h1>ようこそ</h1>
      <p>E2Eテストの題材となるサンプルページです。</p>
      <button type="button">送信</button>
      <button type="button" onClick={() => setIsClicked(true)}>
        表示
      </button>
      {isClicked && <p>ボタンがクリックされました</p>}
      <div data-testid="user-profile">ゲストさん</div>
      <nav>
        <ul>
          <li>
            <Link to="/contact">お問い合わせ</Link>
          </li>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
          <li>
            <Link to="/details">詳細を見る</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};
