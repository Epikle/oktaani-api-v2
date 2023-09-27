import Elysia from 'elysia';

export const errorHandler = new Elysia().onError(({ code, error }) => {
  console.log({ code, error });
  return new Response(error.toString());
});
