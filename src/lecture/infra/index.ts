import { Provider } from '@nestjs/common';
import { PARTICIPANT_REPOSITORY } from '../domain/repositories';
import { ParticipantRepositoryImpl } from './repositories/participant.repository.impl';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository.impl';

export const repositories: Provider[] = [
  {
    provide: PARTICIPANT_REPOSITORY,
    useClass: ParticipantRepositoryImpl,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
];
