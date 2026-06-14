import { usersHandlers } from './handlers/users';
import { todosHandlers } from './handlers/todos';

export const handlers = [...usersHandlers, ...todosHandlers];
