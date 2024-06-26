import { DomainError } from '../../../lib/errors';
import { Application } from './application.model';
import { Lecture } from './lecture.model';
import { Participant } from './participant.model';
import { Session } from './session.model';
import { User } from './user.model';

const lecture = Lecture.create({ name: '테스트 특강' });

describe('특강 세션', () => {
  let session: Session;

  beforeEach(() => {
    session = Session.create({
      date: new Date(),
      time: new Date(),
      isPublished: true,
      maxParticipants: 30,
      lecture,
    });
  });

  describe('참가자 생성', () => {
    it('참가자를 생성합니다.', () => {
      // given
      const user = User.from({
        id: '1',
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '01021004364',
        createdDate: new Date(),
        updatedDate: new Date(),
      });

      // when
      const participant = session.enterUser(user);

      // then
      const expected = Participant.from({
        sessionId: session.id,
        userId: user.id,
        realname: user.realname,
        email: user.email,
        phone: user.phone,
        participantedDate: expect.any(Date),
        createdDate: user.createdDate,
        updatedDate: user.updatedDate,
      });
      expect(participant).toEqual(expected);
      expect(participant).toBeInstanceOf(Participant);
    });
  });

  describe('특강 신청', () => {
    it('유저는 특강을 신청하여 참가자를 추가합니다.', () => {
      // given
      const participant = Participant.from({
        sessionId: '1',
        userId: '1',
        realname: '이선주',
        email: 'boy672820@gmail.com',
        phone: '01021004364',
        participantedDate: expect.any(Date),
        createdDate: expect.any(Date),
        updatedDate: expect.any(Date),
      });

      // when
      const application = session.applyParticipant(participant);

      // then
      const expected = Application.from({
        id: expect.any(String),
        userId: application.userId,
        sessionId: application.sessionId,
        realname: application.realname,
        email: application.email,
        phone: application.phone,
        appliedDate: expect.any(Date),
        createdDate: application.createdDate,
        updatedDate: application.updatedDate,
      });
      expect(application).toEqual(expected);
      expect(application).toBeInstanceOf(Application);
      expect(session.applications).toContain(application);
    });

    describe('다음의 경우 특강 신청이 실패합니다.', () => {
      it('특강이 모집이 완료된 경우', () => {
        const participant = Participant.from({
          sessionId: '1',
          userId: '1',
          realname: '이선주',
          email: 'boy672820@gmail.com',
          phone: '01021004364',
          participantedDate: expect.any(Date),
          createdDate: expect.any(Date),
          updatedDate: expect.any(Date),
        });

        for (let i = 0; i < 30; i++) {
          session.applyParticipant(participant);
        }

        expect(() => session.applyParticipant(participant)).toThrow(
          DomainError.limitExceeded('참가자가 모두 모집되었습니다.'),
        );
      });
    });
  });
});
