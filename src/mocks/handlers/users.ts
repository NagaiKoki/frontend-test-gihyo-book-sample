import { http, HttpResponse } from 'msw';
import { mockUsers } from '../data/users';

export const usersHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  http.get('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = mockUsers.find((u) => u.id === Number(userId));
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.post('/api/users', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  http.patch('/api/users/:userId', async ({ params, request }) => {
    const { userId } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const user = mockUsers.find((u) => u.id === Number(userId));
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ ...user, ...body });
  }),

  http.delete('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = mockUsers.find((u) => u.id === Number(userId));
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),
];
