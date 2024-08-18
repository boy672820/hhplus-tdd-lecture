import { Provider, Type } from '@nestjs/common';
import {
  USER_REPOSITORY,
  PARTICIPANT_REPOSITORY,
  LECTURE_REPOSITORY,
  APPLICATION_REPOSITORY,
} from '../domain/repositories';
import { ParticipantRepositoryImpl } from './repositories/participant.repository.impl';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { LectureRepositoryImpl } from './repositories/lecture.repository.impl';
import { ApplicationRepositoryImpl } from './repositories/application.repository.impl';
import { LectureMapper } from './mappers/lecture.mapper';
import { LectureFactory } from './factories';

export const participantRepositoryProvider: Provider = {
  provide: PARTICIPANT_REPOSITORY,
  useClass: ParticipantRepositoryImpl,
};

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};

export const lectureRepositoryProvider: Provider = {
  provide: LECTURE_REPOSITORY,
  useClass: LectureRepositoryImpl,
};

export const applicationRepositoryProvider: Provider = {
  provide: APPLICATION_REPOSITORY,
  useClass: ApplicationRepositoryImpl,
};

export const repositories: Provider[] = [
  lectureRepositoryProvider,
  participantRepositoryProvider,
  userRepositoryProvider,
  applicationRepositoryProvider,
];

export const factories: Type<any>[] = [LectureFactory];

export const mappers: Type<any>[] = [LectureMapper];
