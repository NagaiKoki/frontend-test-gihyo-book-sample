import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse, delay } from 'msw';
import { expect, waitFor } from 'storybook/test';
import { TodoList } from './TodoList';

const mockTodos = [
  { id: 1, title: '牛乳を買う', completed: false },
  { id: 2, title: 'レポートを書く', completed: false },
  { id: 3, title: '掃除をする', completed: true },
];

const meta = {
  component: TodoList,
  title: 'Components/TodoList',
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OptimisticUpdateSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/todos', () => {
          return HttpResponse.json(mockTodos);
        }),
        http.patch('/api/todos/:id', async ({ params, request }) => {
          await delay(300);
          const { id } = params;
          const body = (await request.json()) as { completed: boolean };
          const todo = mockTodos.find((t) => t.id === Number(id));
          return HttpResponse.json({
            ...todo,
            completed: body.completed,
          });
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('heading', { name: 'Todo リスト' });

    const firstCheckbox = canvas.getAllByRole('checkbox')[0];
    expect(firstCheckbox).not.toBeChecked();

    const firstTodoText = canvas.getByText('牛乳を買う');
    expect(firstTodoText).toHaveStyle({ textDecoration: 'none' });

    await userEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(firstTodoText).toHaveStyle({ textDecoration: 'line-through' });

    await waitFor(
      () => {
        expect(firstCheckbox).toBeChecked();
      },
      { timeout: 2000 },
    );

    expect(canvas.queryByRole('alert')).toBeNull();
  },
};

export const OptimisticUpdateFailure: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/todos', () => {
          return HttpResponse.json(mockTodos);
        }),
        http.patch('/api/todos/:id', async () => {
          await delay(500);
          return HttpResponse.json(
            { error: '更新に失敗しました' },
            { status: 500 },
          );
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await canvas.findByRole('heading', { name: 'Todo リスト' });

    const firstCheckbox = canvas.getAllByRole('checkbox')[0];
    const firstTodoText = canvas.getByText('牛乳を買う');

    expect(firstCheckbox).not.toBeChecked();
    expect(firstTodoText).toHaveStyle({ textDecoration: 'none' });

    await userEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(firstTodoText).toHaveStyle({ textDecoration: 'line-through' });

    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toHaveTextContent('更新に失敗しました');

    await waitFor(() => {
      expect(firstCheckbox).not.toBeChecked();
    });
    expect(firstTodoText).toHaveStyle({ textDecoration: 'none' });
  },
};
