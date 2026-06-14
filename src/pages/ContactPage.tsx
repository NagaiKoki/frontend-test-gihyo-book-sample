import { type FormEvent, useState } from 'react';

type Errors = {
  name?: string;
  email?: string;
  content?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [notify, setNotify] = useState(true);

  const validate = (): Errors => {
    const nextErrors: Errors = {};

    if (!name) {
      nextErrors.name = 'お名前を入力してください';
    }

    if (!email) {
      nextErrors.email = 'メールアドレスを入力してください';
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!content) {
      nextErrors.content = 'お問い合わせ内容を入力してください';
    }

    return nextErrors;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage('');
    setServerError('');

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, content }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSuccessMessage('お問い合わせを受け付けました。ありがとうございます。');
      setName('');
      setEmail('');
      setContent('');
    } catch {
      setServerError('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>お問い合わせ</h1>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="name">お名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span role="alert">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span role="alert">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="content">お問い合わせ内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <span role="alert">{errors.content}</span>}
        </div>
        <div>
          <label htmlFor="notify">通知を受け取る</label>
          <input
            id="notify"
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          送信
        </button>
        {isSubmitting && <div data-testid="loading-spinner">送信中...</div>}
      </form>
      {successMessage && (
        <>
          <p>送信が完了しました</p>
          <p>{successMessage}</p>
        </>
      )}
      {serverError && <p role="alert">{serverError}</p>}
    </main>
  );
};
