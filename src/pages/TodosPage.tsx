import { type FormEvent, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [nextId, setNextId] = useState(1);

  const onAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    setTodos((prev) => [...prev, { id: nextId, text, completed: false }]);
    setNextId((id) => id + 1);
    setText('');
  };

  const onToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const onDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <main>
      <h1>ToDo</h1>
      <form onSubmit={onAdd}>
        <input
          type="text"
          placeholder="新しいタスクを入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button type="button" onClick={() => onDelete(todo.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};
