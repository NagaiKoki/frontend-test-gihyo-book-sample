import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (active) {
        setUsers(data.users);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <h1>ユーザー一覧</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>メールアドレス</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
