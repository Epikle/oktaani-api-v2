import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';

import { errorHandler } from './errorHandler';
import { todoRoutes } from './oktaani-todo';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Oktaani API v2',
          description: 'This is the documentation for my API.',
          version: '2.0.1',
        },
        tags: [
          { name: 'health', description: 'API health check' },
          { name: 'todo', description: 'Todo endpoints' },
        ],
      },
    })
  )
  .use(cors())
  .use(errorHandler)
  .get('/', () => 'Hello :)')
  .get('/health', () => 'OK', {
    response: t.String({ description: 'Returns OK string for health check.' }),
    detail: {
      tags: ['health'],
    },
  })
  .group('/api', (app) =>
    app
      .get('/', () => 'Oktaani API')
      .group('/v2', (app) => app.get('/', () => 'Using v2').use(todoRoutes))
  )
  .listen(process.env.PORT ?? 5000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
