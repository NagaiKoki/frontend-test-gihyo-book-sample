export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const mockTodos: Todo[] = [
  { id: 1, title: '牛乳を買う', completed: false },
  { id: 2, title: 'レポートを書く', completed: false },
  { id: 3, title: '掃除をする', completed: true },
];
