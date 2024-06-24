import { Controller, Param, Post } from '@nestjs/common';
import { ParticipantResponse } from '../responses';

@Controller('lectures')
export class LectureController {
  @Post(':lectureId/apply')
  async apply(
    @Param('lectureId') lectureId: string,
    { userId }: { userId: string },
  ): Promise<ParticipantResponse> {
    return ParticipantResponse.from({
      realname: '이선주',
      email: 'boy672820@gmail.com',
      phone: '01021004364',
      participantedDate: new Date(),
    });
  }
}
