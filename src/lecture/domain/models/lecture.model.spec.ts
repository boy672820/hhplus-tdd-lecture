import { LocalDate, LocalTime } from '@lib/types';
import { DomainError } from '@lib/errors';
import { Application } from './application.model';
import { Lecture } from './lecture.model';
import { User } from './user.model';

const createUser = () =>
  User.from({
    id: '1',
    realname: '이선주',
    email: 'boy672820@gmail.com',
    phone: '01021004364',
    createdDate: new Date(),
    updatedDate: new Date(),
  });

describe('Lecture', () => {
  let lecture: Lecture;

  beforeEach(() => {
    lecture = Lecture.create({
      name: '강의 이름',
      date: LocalDate.now(),
      time: LocalTime.now().minusHours(1),
      maxParticipants: 10,
    });
  });

  describe('특강 신청', () => {
    it('유저는 특강을 신청할 수 있습니다.', () => {
      // Given
      const user = createUser();

      // When
      const result = lecture.applyUser(user);

      // Then
      const expected: Application = Application.from({
        id: expect.any(String),
        lectureId: lecture.id,
        userId: user.id,
        appliedDate: expect.any(Date),
      });
      expect(result).toEqual(expected);
      expect(result).toBeInstanceOf(Application);
    });

    describe('다음의 경우 특강 신청이 실패합니다.', () => {
      it('남은 자리가 없을 경우', () => {
        // Given
        const user = createUser();

        // When
        for (let i = 0; i < lecture.maxParticipants; i++) {
          lecture.applyUser(createUser());
        }

        // Then
        expect(() => lecture.applyUser(user)).toThrow(
          DomainError.limitExceeded('특강 신청이 마감되었습니다.'),
        );
      });

      it('지정된 시간(date & time) 이전에 신청할 경우', () => {
        // // Given
        const user = createUser();
        const oneDayLeft = Lecture.create({
          date: LocalDate.now().addDays(1),
          time: LocalTime.now().addHours(1),
          maxParticipants: 10,
          name: '강의 이름',
        });

        // // Then
        expect(() => oneDayLeft.applyUser(user)).toThrow(
          DomainError.invalidParameter('특강 신청이 가능한 시간이 아닙니다.'),
        );

        // Given
        const oneHourLeft = Lecture.create({
          date: LocalDate.now(),
          time: LocalTime.now().addHours(1),
          maxParticipants: 10,
          name: '강의 이름',
        });

        // Then
        expect(() => oneHourLeft.applyUser(user)).toThrow(
          DomainError.invalidParameter('특강 신청이 가능한 시간이 아닙니다.'),
        );
      });
    });
  });
});
