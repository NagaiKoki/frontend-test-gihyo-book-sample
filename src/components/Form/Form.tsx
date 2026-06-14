import { useState, type FormEvent } from 'react';

type Props = {
  onSubmit?: (data: { name: string; email: string }) => void;
};

export const Form = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      setError('名前とメールは必須です');
      return;
    }
    setError('');
    setSubmitted(true);
    onSubmit?.({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">メール</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p role="alert">{error}</p>}
      {submitted && <p>送信完了</p>}
      <button type="submit">送信</button>
    </form>
  );
};
