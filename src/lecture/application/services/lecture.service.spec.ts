import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { Participant } from '../../domain/models';

describe('LectureService', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [LectureService],
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
        id: expect.any(String),
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '01021004364',
        participantedDate: expect.any(Date),
      });
      expect(result).toBeInstanceOf(Participant);
      expect(result).toEqual(expected);
    });
  });
});
