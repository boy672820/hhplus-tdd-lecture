import { Inject, Injectable } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Participant } from '../../domain/models';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';

@Injectable()
export class LectureServiceImpl extends LectureService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PARTICIPANT_REPOSITORY)
    private readonly participantRepository: ParticipantRepository,
  ) {
    super();
  }

  async apply(lectureId: string, userId: string): Promise<Participant> {
    return Participant.create({
      sessionId: '1',
      userId,
      realname: '이선주',
      email: 'boy672820@gmail.com',
      phone: '01021004364',
      createdDate: new Date(),
      updatedDate: new Date(),
    });
  }
}
