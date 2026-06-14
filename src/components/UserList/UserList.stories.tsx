import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse, delay } from 'msw';
import { expect, within, waitFor } from 'storybook/test';
import { UserList } from './UserList';
import { mockUsers, generateMockUsers } from '../../mocks/data/users';

const meta = {
  component: UserList,
  title: 'Components/UserList',
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', async () => {
          await delay(500);
          return HttpResponse.json(mockUsers);
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', async () => {
          await delay(300);
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};

export const LoadingAndSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', async () => {
          await delay(800);
          return HttpResponse.json(mockUsers);
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('status')).toHaveTextContent('読み込み中...');
    expect(canvas.queryByRole('heading', { name: 'ユーザー一覧' })).toBeNull();

    await waitFor(
      () => {
        expect(
          canvas.getByRole('heading', { name: 'ユーザー一覧' }),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    expect(canvas.queryByRole('status')).toBeNull();
  },
};

export const VerifyUserData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json(mockUsers);
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'ユーザー一覧' });

    expect(canvas.getByText('田中太郎')).toBeInTheDocument();
    expect(canvas.getByText('tanaka@example.com')).toBeInTheDocument();
    expect(canvas.getByText('鈴木花子')).toBeInTheDocument();
    expect(canvas.getByText('suzuki@example.com')).toBeInTheDocument();
    expect(canvas.getByText('佐藤次郎')).toBeInTheDocument();
    expect(canvas.getByText('sato@example.com')).toBeInTheDocument();

    const listItems = canvas.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  },
};

export const VerifyListStructure: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json(mockUsers);
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'ユーザー一覧' });

    const list = canvas.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = canvas.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    listItems.forEach((item, index) => {
      const user = mockUsers[index];
      expect(within(item).getByText(user.name)).toBeInTheDocument();
      expect(within(item).getByText(user.email)).toBeInTheDocument();
    });
  },
};

export const ManyUsers: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json(generateMockUsers(50));
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    await canvas.findByRole('heading', { name: 'ユーザー一覧' });

    const listItems = canvas.getAllByRole('listitem');
    expect(listItems).toHaveLength(50);

    expect(canvas.getByText('ユーザー 1')).toBeInTheDocument();
    expect(canvas.getByText('ユーザー 50')).toBeInTheDocument();
  },
};

export const ServerError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('ユーザー情報の取得に失敗しました');

    expect(canvas.queryByRole('heading', { name: 'ユーザー一覧' })).toBeNull();
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBeTruthy();
  },
};

export const UnauthorizedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return new HttpResponse(null, { status: 401 });
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toHaveTextContent('ユーザー情報の取得に失敗しました');
  },
};

export const CustomErrorMessage: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json(
            {
              error:
                'データベース接続に失敗しました。しばらくしてから再度お試しください。',
            },
            { status: 500 },
          );
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    const errorMessage = await canvas.findByRole('alert');
    expect(errorMessage).toHaveTextContent(
      'データベース接続に失敗しました。しばらくしてから再度お試しください。',
    );
  },
};
