import { User } from '../models';

export const USER_REPOSITORY = Symbol.for('USER_REPOSITORY');

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  remove(user: User): Promise<void>;
}
