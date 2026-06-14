import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Errors = {
  email?: string;
  password?: string;
};

const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'password123';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [authError, setAuthError] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAuthError('');

    const nextErrors: Errors = {};
    if (!email) {
      nextErrors.email = 'メールアドレスを入力してください';
    }
    if (!password) {
      nextErrors.password = 'パスワードを入力してください';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setAuthError('メールアドレスまたはパスワードが正しくありません');
      return;
    }

    navigate('/dashboard', { state: { email } });
  };

  return (
    <main>
      <h1>ログイン</h1>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">ログイン</button>
        {authError && <span role="alert">{authError}</span>}
      </form>
    </main>
  );
};
