export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
};

export const createMockUser = (overrides?: Partial<User>): User => {
  const defaultUser: User = {
    id: Math.floor(Math.random() * 10000),
    name: 'テストユーザー',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  return { ...defaultUser, ...overrides };
};

export const mockUsers: User[] = [
  createMockUser({ id: 1, name: '田中太郎', email: 'tanaka@example.com' }),
  createMockUser({
    id: 2,
    name: '鈴木花子',
    email: 'suzuki@example.com',
    role: 'admin',
  }),
  createMockUser({ id: 3, name: '佐藤次郎', email: 'sato@example.com' }),
];

export const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `ユーザー ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));
};
