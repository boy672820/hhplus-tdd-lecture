import { Provider } from '@nestjs/common';
import {
  USER_REPOSITORY,
  PARTICIPANT_REPOSITORY,
  SESSION_REPOSITORY,
} from '../domain/repositories';
import { ParticipantRepositoryImpl } from './repositories/participant.repository.impl';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { SessionRepositoryImpl } from './repositories/session.repository.impl';

export const participantRepositoryProvider: Provider = {
  provide: PARTICIPANT_REPOSITORY,
  useClass: ParticipantRepositoryImpl,
};

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};

export const sessionRepositoryProvider: Provider = {
  provide: SESSION_REPOSITORY,
  useClass: SessionRepositoryImpl,
};

export const repositories: Provider[] = [
  participantRepositoryProvider,
  userRepositoryProvider,
  sessionRepositoryProvider,
];
