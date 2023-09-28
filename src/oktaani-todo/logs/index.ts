import { Elysia } from 'elysia';

import { db } from '../../db';

export const todoLogsRoutes = new Elysia({ prefix: '/logs' })
  .decorate('db', () => db())
  .get('/', () => 'hello', {
    detail: {
      tags: ['todo'],
    },
  });

// db.yourCollection.findOne()._id.getTimestamp()
