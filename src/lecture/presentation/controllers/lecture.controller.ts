import { Controller, Param, Post } from '@nestjs/common';
import { ParticipantResponse } from '../responses';

@Controller('lectures')
export class LectureController {
  @Post('sessions/:sessionId/apply')
  async apply(
    @Param('sessionId') sessionId: string,
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
