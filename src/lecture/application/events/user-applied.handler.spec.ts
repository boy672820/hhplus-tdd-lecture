import { Test } from '@nestjs/testing';
import { UserAppliedHandler } from './user-applied.handler';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';
import { User } from '../../domain/models';

const userRepository: UserRepository = {
  findById: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};
const participantRepository: ParticipantRepository = {
  save: jest.fn(),
};

describe('UserAppliedHandler', () => {
  let handler: UserAppliedHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserAppliedHandler,
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

    handler = moduleRef.get<UserAppliedHandler>(UserAppliedHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('유저가 특강에 신청했을 때 이벤트가 발생합니다.', () => {
    it('유저가 존재하지 않으면 아무것도 하지 않습니다.', async () => {
      // Given
      const events = { userId: '1', lectureId: '1' };
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      // When
      await handler.handle(events);

      // Then
      expect(participantRepository.save).toHaveBeenCalledTimes(0);
    });

    it('유저가 존재하면 참가자를 저장합니다.', async () => {
      // Given
      const events = { userId: '1', lectureId: '1' };
      const user = User.from({
        id: '1',
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '010-1234-5678',
        createdDate: new Date(),
        updatedDate: new Date(),
      });
      jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

      // When
      await handler.handle(events);

      // Then
      expect(participantRepository.save).toHaveBeenCalled();
    });
  });
});
