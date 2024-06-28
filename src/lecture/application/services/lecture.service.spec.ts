import { ApplicationError } from '@lib/errors';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { Application, Lecture, User } from '../../domain/models';
import {
  APPLICATION_REPOSITORY,
  ApplicationRepository,
  LECTURE_REPOSITORY,
  LectureRepository,
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';
import { lectureServiceProvider } from '..';
import { LocalDate, LocalTime } from '../../../lib/types';

jest.mock('@lib/decorators', () => ({
  Transactional: () => jest.fn(),
}));

const lecture = Lecture.from({
  id: '1',
  name: '테스트 특강',
  date: LocalDate.now(),
  time: LocalTime.now().minusHours(1),
  maxParticipants: 30,
  remainingSeats: 30,
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

const lectureRepository: LectureRepository = {
  findById: jest.fn().mockResolvedValue(Promise.resolve(lecture)),
  save: jest.fn(),
};
const applicationRepository: ApplicationRepository = {
  findByUserIdAndLectureId: jest.fn().mockResolvedValue(Promise.resolve(null)),
  save: jest.fn(),
};
const userRepository: UserRepository = {
  findById: jest.fn().mockResolvedValue(Promise.resolve(user)),
  save: jest.fn(),
  remove: jest.fn(),
};
const participantRepository: ParticipantRepository = {
  save: jest.fn(),
};

describe('LectureService', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        lectureServiceProvider,
        {
          provide: LECTURE_REPOSITORY,
          useValue: lectureRepository,
        },
        {
          provide: APPLICATION_REPOSITORY,
          useValue: applicationRepository,
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
      const expected: Application = Application.from({
        id: expect.any(String),
        lectureId: lectureId,
        userId,
        appliedDate: expect.any(Date),
      });
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Application);
      expect(lectureRepository.save).toHaveBeenCalledWith(lecture);
      expect(applicationRepository.save).toHaveBeenCalledWith(result);
    });

    describe('다음의 경우 특강 신청이 실패합니다.', () => {
      it('특강이 존재하지 않음', async () => {
        // given
        const lectureId = '999';
        const userId = '1';
        jest.spyOn(lectureRepository, 'findById').mockResolvedValueOnce(null);

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

      it('이미 특강을 신청한 유저', async () => {
        // given
        const lectureId = '1';
        const userId = '1';
        jest
          .spyOn(applicationRepository, 'findByUserIdAndLectureId')
          .mockResolvedValueOnce(
            Application.from({
              id: '1',
              lectureId: '1',
              userId: '1',
              appliedDate: new Date(),
            }),
          );

        // when
        const result = lectureService.apply(lectureId, userId);

        // then
        await expect(result).rejects.toThrow(
          ApplicationError.duplicated('이미 신청한 특강입니다.'),
        );
      });
    });
  });
});
