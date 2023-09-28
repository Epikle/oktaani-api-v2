import { Elysia } from 'elysia';

import { db } from '../../db';

export const todoStatsRoutes = new Elysia({ prefix: '/stats' })
  .decorate('db', () => db())
  .get('/', () => 'hello', {
    detail: {
      tags: ['todo'],
    },
  });

// db.yourCollection.findOne()._id.getTimestamp()
