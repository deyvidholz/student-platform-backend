export default {
  parser: {
    QueryFailedError: (error: any) => {
      error.data = undefined;

      if (+error?.code === 23505) {
        if (error.table === 'users') {
          error.httpCode = 409;
          error.message = 'Username already in use';
          return;
        }
      }

      error.message = 'An interal error occurred';
    },
  },
} as { [key: string]: any };
