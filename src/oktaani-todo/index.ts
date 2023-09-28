import Elysia from 'elysia';

import { todoShareRoutes } from './todo';

export const todoRoutes = new Elysia().group('/todo', (app) =>
  app.use(todoShareRoutes)
);
