import { LocalDate, LocalTime, ResponseEntity } from '@lib/types';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from './lecture.controller';
import { ApplicationResponse, LectureResponse } from '../responses';
import { LectureService } from '../../application/services';
import { Application, Lecture } from '../../domain/models';

const application = Application.from({
  id: '1',
  userId: '1',
  lectureId: '1',
  appliedDate: new Date(),
});

const lectureService: LectureService = {
  apply: jest.fn().mockResolvedValue(application),
  findAll: jest.fn().mockResolvedValue([]),
  isApplied: jest.fn().mockResolvedValue(true),
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
      const lectureId = '1';
      const userId = '1';

      // When
      const result = await lectureController.apply(lectureId, { userId });

      // Then
      const expected: ResponseEntity<ApplicationResponse> =
        ResponseEntity.okWith({
          appliedDate: application.appliedDate,
        });
      expect(result).toEqual(expected);
    });
  });

  describe('특강 목록 조회', () => {
    it('특강 목록을 조회할 수 있어야합니다.', async () => {
      // Given
      const lectures = [
        Lecture.from({
          id: '1',
          name: 'test',
          date: LocalDate.now(),
          time: LocalTime.now(),
          maxParticipants: 10,
          remainingSeats: 10,
          createdDate: new Date(),
          updatedDate: new Date(),
        }),
      ];
      jest.spyOn(lectureService, 'findAll').mockResolvedValue(lectures);

      // When
      const result = await lectureController.findAll();

      // Then
      const expected: ResponseEntity<LectureResponse[]> = ResponseEntity.okWith(
        lectures.map(LectureResponse.from),
      );
      expect(result).toEqual(expected);
    });
  });

  describe('특강 신청 여부 조회', () => {
    it('특강 신청 여부를 조회할 수 있어야합니다. (true or false)', async () => {
      // Given
      const lectureId = '1';
      const userId = '1';
      jest.spyOn(lectureService, 'isApplied').mockResolvedValue(true);

      // When
      const result = await lectureController.isApplied(lectureId, userId);

      // Then
      const expected: ResponseEntity<boolean> = ResponseEntity.okWith(true);
      expect(result).toEqual(expected);
    });
  });
});
