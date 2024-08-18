import { Mutex } from 'async-mutex';
import { QueryRunner } from 'typeorm';

export let connection: QueryRunner;

export const setConnectionForTx = (_connection: QueryRunner) => {
  connection = _connection;
};

const mutex = new Mutex();

export function Transactional() {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = new Proxy(originalMethod, {
      apply: async (proxyTarget, thisArg, args) => {
        const release = await mutex.acquire();

        try {
          await connection.startTransaction();

          const result = await proxyTarget.apply(thisArg, args);

          await connection.commitTransaction();

          return result;
        } catch (e) {
          await connection.rollbackTransaction();
          throw e;
        } finally {
          release();
        }
      },
    });
  };
}
