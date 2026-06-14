import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleMessage } from './ToggleMessage';

test('表示ボタンをクリックするとメッセージが表示される', async () => {
  const user = userEvent.setup();
  render(<ToggleMessage />);

  const button = screen.getByRole('button', { name: '表示' });
  await user.click(button);

  expect(screen.getByText('こんにちは！')).toBeInTheDocument();
});
