import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');

        if (!response.ok) {
          // レスポンスボディにエラーメッセージがあれば使用する
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || 'ユーザー情報の取得に失敗しました',
          );
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div role="status">読み込み中...</div>;
  }

  if (error) {
    return <div role="alert">{error}</div>;
  }

  if (users.length === 0) {
    return <p>ユーザーが見つかりませんでした。</p>;
  }

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong>
            </div>
            <div>{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
