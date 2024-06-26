import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from './lecture.controller';
import { ApplicationResponse } from '../responses';
import { LectureService } from '../../application/services';
import { Application } from '../../domain/models';

const application = Application.from({
  id: '1',
  userId: '1',
  lectureId: '1',
  appliedDate: new Date(),
});

const lectureService: LectureService = {
  apply: jest.fn().mockResolvedValue(application),
};

describe('LectureController', () => {
  let lectureController: LectureController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
      providers: [{ provide: LectureService, useValue: lectureService }],
    }).compile();

    lectureController = moduleRef.get<LectureController>(LectureController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('특강 신청하기', () => {
    it('유저는 특강을 신청할 수 있어야합니다.', async () => {
      // Given
      const sessionId = '1';
      const userId = '1';

      // When
      const result = await lectureController.apply(sessionId, { userId });

      // Then
      const expected: ApplicationResponse = {
        appliedDate: application.appliedDate,
      };
      expect(result).toEqual(expected);
    });
  });
});
