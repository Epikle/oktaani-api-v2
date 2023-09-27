import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';

import { todoRoutes } from './oktaani-todo';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Oktaani API v3',
          description: 'This is the documentation for my API.',
          version: '3.0.0',
        },
      },
    })
  )
  .get('/health', () => 'OK', {
    response: t.String({ description: 'Returns OK string for health check.' }),
    detail: {
      summary: 'API health check',
      tags: ['health'],
    },
  })
  .group('/v3', { detail: { tags: ['v3'] } }, (app) => app.use(todoRoutes))
  .listen(process.env.PORT ?? 5000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
