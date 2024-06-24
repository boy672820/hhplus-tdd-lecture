import { Injectable } from '@nestjs/common';
import { Participant } from '../../domain/models';

@Injectable()
export class LectureService {
  async apply(lectureId: string, userId: string): Promise<Participant> {
    return Participant.create({
      realname: '이선주',
      email: 'boy672820@gmail.com',
      phone: '01021004364',
      participantedDate: new Date(),
    });
  }
}
