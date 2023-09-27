import { Elysia, NotFoundError, t } from 'elysia';
import { MongoError, ObjectId } from 'mongodb';

import { db } from '../db';
import { type Todo, todoModel } from './model';

export const todoRoutes = new Elysia({ prefix: '/todo' })
  .decorate('db', () => db())
  .use(todoModel)
  .get(
    '/:id',
    async ({ db, params }) => {
      const { id } = params;
      const query = { _id: new ObjectId(id) };
      const data = await db().collection<Todo>('test').findOne(query);

      if (!data) throw new NotFoundError();

      return { ...data, _id: data._id.toString() };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      response: 'response',
    }
  )
  .post(
    '/',
    async ({ db, body }) => {
      const { insertedId } = await db()
        .collection<Todo>('test')
        .insertOne(body);

      return { ...body, _id: insertedId.toString() };
    },
    {
      body: 'todo',
      response: 'response',
    }
  );
