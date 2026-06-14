import { useState, useEffect } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) throw new Error('取得に失敗しました');
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const toggleTodo = async (id: number) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    const previousTodos = [...todos];

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !targetTodo.completed }),
      });

      if (!response.ok) {
        throw new Error('更新に失敗しました');
      }

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (err) {
      setTodos(previousTodos);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  if (loading) return <div role="status">読み込み中...</div>;

  return (
    <div>
      <h2>Todo リスト</h2>
      {error && <div role="alert">{error}</div>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
