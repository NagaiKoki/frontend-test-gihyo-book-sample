import { type FormEvent, useState } from 'react';

export const TodoForm = () => {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) {
      setErrorMessage('内容を入力してください');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Todoの追加に成功しました');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="content">内容</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errorMessage && <span role="alert">{errorMessage}</span>}
      </div>
      <button type="submit">追加</button>
      {successMessage && <span>{successMessage}</span>}
    </form>
  );
};
