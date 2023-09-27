import { Elysia, t } from 'elysia';

export const todoRoutes = new Elysia({ prefix: '/todo' })
  .get('/', () => ({
    message: 'todo',
  }))
  .post('/', ({ body }) => ({ id: 123, ...body }), {
    body: t.Object({
      username: t.String(),
      password: t.String(),
      test: t.Optional(t.Boolean()),
    }),
    response: t.Object({
      id: t.Number(),
      username: t.String(),
      password: t.String(),
      test: t.Optional(t.Boolean()),
    }),
  });
