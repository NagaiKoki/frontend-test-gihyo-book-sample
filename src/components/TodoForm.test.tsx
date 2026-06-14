import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  test('必須フィールド未入力時はエラーメッセージを表示する', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    // 内容入力欄が空のまま追加ボタンをクリック
    await user.click(screen.getByRole('button', { name: '追加' }));

    // 必須項目エラーのメッセージが表示されることを確認（role="alert"で取得）
    expect(screen.getByRole('alert')).toHaveTextContent(
      '内容を入力してください',
    );

    // 成功メッセージは表示されていないことを確認
    expect(
      screen.queryByText('Todoの追加に成功しました'),
    ).not.toBeInTheDocument();
  });

  test('内容を入力するとエラーメッセージが消える', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    // まずエラーを発生させる
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // フィールドにテキストを入力
    const input = screen.getByLabelText('内容');
    await user.type(input, '牛乳を買う');
    // 再度送信してエラーが消えることを確認
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('内容を入力して送信すると成功メッセージが表示される', async () => {
    const user = userEvent.setup();
    render(<TodoForm />);

    // 内容を入力
    const input = screen.getByLabelText('内容');
    await user.type(input, '買い物に行く');

    // 追加ボタンをクリック
    await user.click(screen.getByRole('button', { name: '追加' }));

    // 成功メッセージが表示されることを確認
    expect(screen.getByText('Todoの追加に成功しました')).toBeInTheDocument();

    // エラーメッセージは表示されていないことを確認
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
