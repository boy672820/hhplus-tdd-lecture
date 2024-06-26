import { ApplicationError } from '@lib/errors';
import { Inject, Injectable } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Participant } from '../../domain/models';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  SESSION_REPOSITORY,
  SessionRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';

@Injectable()
export class LectureServiceImpl extends LectureService {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PARTICIPANT_REPOSITORY)
    private readonly participantRepository: ParticipantRepository,
  ) {
    super();
  }

  async apply(sessionId: string, userId: string): Promise<Participant> {
    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw ApplicationError.notFound('특강을 찾을 수 없습니다.');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw ApplicationError.unauthorized('유저를 찾을 수 없습니다.');
    }

    const participant = await this.participantRepository.findById({
      sessionId,
      userId,
    });

    if (participant) {
      throw ApplicationError.duplicated('이미 신청한 특강입니다.');
    }

    const newParticipant = session.applyUser(user);

    return newParticipant;
  }
}
