import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Form } from './Form';

const meta = {
  component: Form,
  title: 'Components/Form',
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValidation: Story = {
  play: async ({ canvas, userEvent }) => {
    // 未入力のまま送信するとバリデーションエラーが表示される
    await userEvent.click(canvas.getByRole('button', { name: '送信' }));

    await expect(
      canvas.getByText('名前とメールは必須です'),
    ).toBeInTheDocument();
  },
};

export const CompleteForm: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvas, args, step, userEvent }) => {
    await step('フォームに入力する', async () => {
      await userEvent.type(canvas.getByLabelText('名前'), '山田太郎');
      await userEvent.type(
        canvas.getByLabelText('メール'),
        'yamada@example.com',
      );
    });

    await step('送信ボタンをクリックする', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '送信' }));
    });

    await step('完了メッセージが表示される', async () => {
      await expect(canvas.getByText('送信完了')).toBeVisible();
    });

    // onSubmit が呼ばれたことを確認
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};
