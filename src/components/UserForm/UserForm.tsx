import { useState, type FormEvent } from 'react';

type User = {
  name: string;
  email: string;
};

type Props = {
  onSuccess?: (user: User) => void;
};

export const UserForm = ({ onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '登録に失敗しました');
      }

      const user = await response.json();
      setSuccess(true);
      setName('');
      setEmail('');
      onSuccess?.(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? '送信中...' : '登録'}
        </button>
      </form>
      {success && <div role="status">ユーザーを登録しました。</div>}
      {error && <div role="alert">{error}</div>}
    </div>
  );
};
