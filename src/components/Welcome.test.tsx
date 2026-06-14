import { render, screen } from '@testing-library/react';
import { Welcome } from './Welcome';

test('ログイン済みの場合、ウェルカムメッセージを表示する', () => {
  render(<Welcome isLoggedIn={true} />);
  expect(screen.getByText('ようこそ！')).toBeInTheDocument();
});

test('未ログインの場合、ウェルカムメッセージを表示しない', () => {
  render(<Welcome isLoggedIn={false} />);
  expect(screen.queryByText('ようこそ！')).toBeNull();
});
