import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse, delay } from 'msw';
import { expect, waitFor } from 'storybook/test';
import { UserForm } from './UserForm';

const meta = {
  component: UserForm,
  title: 'Components/UserForm',
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessfulSubmit: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/users', async ({ request }) => {
          await delay(500);
          const body = (await request.json()) as {
            name: string;
            email: string;
          };
          return HttpResponse.json(
            {
              id: 1,
              name: body.name,
              email: body.email,
              createdAt: new Date().toISOString(),
            },
            { status: 201 },
          );
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    const nameInput = canvas.getByLabelText('名前');
    const emailInput = canvas.getByLabelText('メールアドレス');
    const submitButton = canvas.getByRole('button', { name: '登録' });

    await userEvent.type(nameInput, '田中太郎');
    await userEvent.type(emailInput, 'tanaka@example.com');

    expect(nameInput).toHaveValue('田中太郎');
    expect(emailInput).toHaveValue('tanaka@example.com');

    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('送信中...');

    await waitFor(
      () => {
        expect(canvas.getByRole('status')).toHaveTextContent(
          'ユーザーを登録しました。',
        );
      },
      { timeout: 2000 },
    );

    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveTextContent('登録');

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

    expect(canvas.queryByRole('alert')).toBeNull();
  },
};

export const ValidateRequestBody: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/users', async ({ request }) => {
          const body = (await request.json()) as {
            name: string;
            email: string;
          };

          if (!body.name || !body.email) {
            return HttpResponse.json(
              { error: '名前とメールアドレスは必須です' },
              { status: 400 },
            );
          }

          if (!body.email.includes('@')) {
            return HttpResponse.json(
              { error: 'メールアドレスの形式が不正です' },
              { status: 400 },
            );
          }

          return HttpResponse.json({ id: 1, ...body }, { status: 201 });
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('名前'), '田中太郎');
    await userEvent.type(
      canvas.getByLabelText('メールアドレス'),
      'tanaka@example.com',
    );
    await userEvent.click(canvas.getByRole('button', { name: '登録' }));

    await waitFor(() => {
      expect(canvas.getByRole('status')).toBeInTheDocument();
    });
  },
};

export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/users', async () => {
          await delay(300);
          return HttpResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 },
          );
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('名前'), '田中太郎');
    await userEvent.type(
      canvas.getByLabelText('メールアドレス'),
      'tanaka@example.com',
    );
    await userEvent.click(canvas.getByRole('button', { name: '登録' }));

    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toHaveTextContent('サーバーエラーが発生しました');

    expect(canvas.queryByRole('status')).toBeNull();

    expect(canvas.getByRole('button', { name: '登録' })).toBeEnabled();
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('/api/users', () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('名前'), '田中太郎');
    await userEvent.type(
      canvas.getByLabelText('メールアドレス'),
      'tanaka@example.com',
    );
    await userEvent.click(canvas.getByRole('button', { name: '登録' }));

    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toBeInTheDocument();
  },
};
