import { getTodos, saveTodos } from './todos.service';

describe('Todo ストレージ操作', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('localStorage から Todos を取得できる', () => {
    const todo = { id: 1, text: 'Write unit tests' };
    localStorage.setItem('todos', JSON.stringify([todo]));

    expect(getTodos()).toEqual([todo]);
  });

  it('Todos を localStorage に保存できる', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    const todos = [{ id: 1, text: 'Write unit tests' }];

    saveTodos(todos);

    expect(spy).toHaveBeenCalledWith('todos', JSON.stringify(todos));
    spy.mockRestore();
  });

  it('localStorage が空の場合は空配列を返す', () => {
    expect(getTodos()).toEqual([]);
  });
});
