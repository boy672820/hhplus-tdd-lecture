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

  describe('특강 신청', () => {
    it('유저는 특강을 신청하여 참가자를 추가합니다.', () => {
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
      const participant = session.applyUser(user);

      // then
      const expected = Participant.from({
        userId: user.id,
        sessionId: session.id,
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
});
