import Elysia from 'elysia';

import { todoShareRoutes } from './todo';
import { todoStatsRoutes } from './stats';
import { todoLogsRoutes } from './logs';

export const todoRoutes = new Elysia({ prefix: '/todo' })
  .use(todoShareRoutes)
  .use(todoStatsRoutes)
  .use(todoLogsRoutes);
