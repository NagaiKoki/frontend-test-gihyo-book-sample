import type { Todo } from '../types/todo';

export function getTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}
