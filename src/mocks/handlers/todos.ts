import { http, HttpResponse } from 'msw';
import { mockTodos } from '../data/todos';

export const todosHandlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(mockTodos);
  }),

  http.patch('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;
    const todo = mockTodos.find((t) => t.id === Number(id));
    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ ...todo, ...body });
  }),
];
