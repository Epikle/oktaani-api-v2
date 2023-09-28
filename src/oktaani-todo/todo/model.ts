import { Elysia, t } from 'elysia';
import { Static } from '@sinclair/typebox';

enum TodoType {
  todo = 'todo',
  note = 'note',
}
enum TodoItemPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

const Collection = t.Object({
  id: t.String(),
  title: t.String(),
  color: t.String(),
  shared: t.Boolean(),
  type: t.Enum(TodoType),
  createdAt: t.String(),
});

const Item = t.Object({
  colId: t.String(),
  id: t.String(),
  message: t.String(),
  status: t.Boolean(),
  priority: t.Enum(TodoItemPriority),
  createdAt: t.String(),
});

const Note = t.Object({
  colId: t.String(),
  id: t.String(),
  message: t.String(),
  createdAt: t.String(),
});

const SharedEntryWithId = t.Object({
  _id: t.String(),
  col: Collection,
  items: t.Union([t.Array(Item), t.Null()]),
  note: t.Union([Note, t.Null()]),
});

const SharedEntry = t.Omit(SharedEntryWithId, ['_id']);

export type SharedEntry = Static<typeof SharedEntry>;
export const SharedModel = new Elysia().model({
  sharedEntry: SharedEntry,
  response: SharedEntryWithId,
});
