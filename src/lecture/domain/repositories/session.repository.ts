import { Session } from '../models';

export const SESSION_REPOSITORY = Symbol.for('SESSION_REPOSITORY');

export interface SessionRepository {
  findById(id: string): Promise<Session | null>;
}
