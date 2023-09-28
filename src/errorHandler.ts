import Elysia from 'elysia';

export const errorHandler = new Elysia().onError(({ code, set }) => {
  switch (code) {
    case 'NOT_FOUND':
      set.status = 404;
      return 'Not Found :(';

    default:
      set.status = 500;
      return 'Something went wrong :(';
  }
});
