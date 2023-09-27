import { Elysia, t } from 'elysia';
import { Static } from '@sinclair/typebox';

const TodoWithId = t.Object({
  _id: t.String(),
  data: t.String(),
});

const Todo = t.Omit(TodoWithId, ['_id']);

const Message = t.Object({
  message: t.String(),
});

export type Todo = Static<typeof Todo>;
export const todoModel = new Elysia().model({
  todo: Todo,
  response: t.Union([TodoWithId, Message]),
});
