import { Elysia, NotFoundError, t } from 'elysia';
import { ObjectId } from 'mongodb';

import { db } from '../../db';
import { type SharedEntry, SharedModel } from './model';

export const todoShareRoutes = new Elysia({ prefix: '/share' })
  .decorate('db', () => db())
  .use(SharedModel)
  .get(
    '/:id',
    async ({ db, params }) => {
      const { id } = params;
      const query = { _id: new ObjectId(id) };
      const data = await db().collection<SharedEntry>('test').findOne(query);

      if (!data) throw new NotFoundError();

      return { ...data, _id: data._id.toString() };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      response: 'response',
      detail: {
        tags: ['todo'],
      },
    }
  )
  .post(
    '/',
    async ({ db, body }) => {
      const { insertedId } = await db()
        .collection<SharedEntry>('test')
        .insertOne(body);

      return { ...body, _id: insertedId.toString() };
    },
    {
      body: 'sharedEntry',
      response: 'response',
      detail: {
        tags: ['todo'],
      },
    }
  );
