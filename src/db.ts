import { MongoClient, ServerApiVersion } from 'mongodb';

if (Bun.env.DB_CONN_STRING === undefined) {
  throw new Error('env DB_CONN_STRING missing.');
}

const client = new MongoClient(Bun.env.DB_CONN_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export function db() {
  if (Bun.env.DB_NAME === undefined) {
    throw new Error('env DB_NAME missing.');
  }

  return client.db(Bun.env.DB_NAME);
}
