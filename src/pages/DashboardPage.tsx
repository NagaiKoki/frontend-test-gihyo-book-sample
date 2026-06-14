import { useLocation, useNavigate } from 'react-router-dom';

type LocationState = {
  email?: string;
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const email = state?.email ?? 'ゲスト';

  const onLogout = () => {
    navigate('/login');
  };

  return (
    <main>
      <h1>ダッシュボード</h1>
      <p data-testid="welcome-message">ようこそ、{email}</p>
      <button type="button" onClick={onLogout}>
        ログアウト
      </button>
    </main>
  );
};
