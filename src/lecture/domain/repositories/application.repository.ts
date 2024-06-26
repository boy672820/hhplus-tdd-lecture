import { Session } from '../models';

export const APPLICATION_REPOSITORY = Symbol.for('APPLICATION_REPOSITORY');

export interface ApplicationRepository {
  countBySession(session: Session): Promise<number>;
}
