import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from './lecture.controller';
import { ParticipantResponse } from '../responses';

describe('LectureController', () => {
  let lectureController: LectureController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
    }).compile();

    lectureController = moduleRef.get<LectureController>(LectureController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('특강 신청하기', () => {
    it('유저는 특강을 신청할 수 있어야합니다.', async () => {
      const sessionId = '1';
      const userId = '1';

      const expected: ParticipantResponse = {
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '01021004364',
        participantedDate: expect.any(Date),
      };
      await expect(
        lectureController.apply(sessionId, { userId }),
      ).resolves.toEqual(expected);
    });
  });
});
