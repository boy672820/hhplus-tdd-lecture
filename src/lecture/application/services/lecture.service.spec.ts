import { ApplicationError } from '@lib/errors';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { Lecture, Participant, Session, User } from '../../domain/models';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  SESSION_REPOSITORY,
  SessionRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';
import { lectureServiceProvider } from '..';

const lecture = Lecture.from({
  id: '1',
  name: '테스트 특강',
  createdDate: new Date(),
  updatedDate: new Date(),
});
const session = Session.from({
  id: '1',
  date: new Date(),
  time: new Date(),
  isPublished: true,
  maxParticipants: 30,
  lecture,
  applications: [],
  createdDate: new Date(),
  updatedDate: new Date(),
});
const user = User.from({
  id: '1',
  realname: '이선주',
  email: 'boy672820@gmail.com',
  phone: '01021004364',
  createdDate: new Date(),
  updatedDate: new Date(),
});
const participant = Participant.from({
  sessionId: session.id,
  userId: user.id,
  realname: user.realname,
  email: user.email,
  phone: user.phone,
  participantedDate: new Date(),
  createdDate: user.createdDate,
  updatedDate: user.updatedDate,
});

const sessionRepository: SessionRepository = {
  findById: jest.fn().mockResolvedValue(Promise.resolve(session)),
};
const userRepository: UserRepository = {
  findById: jest.fn().mockResolvedValue(Promise.resolve(user)),
};
const participantRepository: ParticipantRepository = {
  findById: jest.fn().mockResolvedValue(Promise.resolve(null)),
  save: jest.fn(),
  exists: jest.fn().mockResolvedValue(Promise.resolve(false)),
};

describe('LectureService', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        lectureServiceProvider,
        {
          provide: SESSION_REPOSITORY,
          useValue: sessionRepository,
        },
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
        {
          provide: PARTICIPANT_REPOSITORY,
          useValue: participantRepository,
        },
      ],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('특강 신청', () => {
    it('유저는 특강을 신청할 수 있어야합니다.', async () => {
      // given
      const lectureId = '1';
      const userId = '1';

      // when
      const result = await lectureService.apply(lectureId, userId);

      // then
      const expected = Participant.from({
        sessionId: '1',
        userId,
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '01021004364',
        participantedDate: expect.any(Date),
        createdDate: expect.any(Date),
        updatedDate: expect.any(Date),
      });
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Participant);
    });

    describe('다음의 경우 특강 신청이 실패합니다.', () => {
      it('이미 특강을 신청한 유저', async () => {
        // given
        const lectureId = '1';
        const userId = '1';
        jest
          .spyOn(participantRepository, 'findById')
          .mockResolvedValueOnce(participant);

        // when
        const result = lectureService.apply(lectureId, userId);

        // then
        await expect(result).rejects.toThrow(
          ApplicationError.duplicated('이미 신청한 특강입니다.'),
        );
      });

      it('특강이 존재하지 않음', async () => {
        // given
        const lectureId = '999';
        const userId = '1';
        jest.spyOn(sessionRepository, 'findById').mockResolvedValueOnce(null);

        // when
        const result = lectureService.apply(lectureId, userId);

        // then
        await expect(result).rejects.toThrow(
          ApplicationError.notFound('특강을 찾을 수 없습니다.'),
        );
      });

      it('유저를 찾을 수 없음', async () => {
        // given
        const lectureId = '1';
        const userId = '999';
        jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

        // when
        const result = lectureService.apply(lectureId, userId);

        // then
        await expect(result).rejects.toThrow(
          ApplicationError.unauthorized('유저를 찾을 수 없습니다.'),
        );
      });
    });
  });
});
