import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { ApplicationResponse } from '../responses';
import { LectureService } from '../../application/services';
import { ApplyRequest } from '../requests';

@Controller('lectures')
export class LectureController {
  constructor(@Inject() private readonly lectureService: LectureService) {}

  @Post(':lectureId/apply')
  async apply(
    @Param('lectureId') lectureId: string,
    @Body() { userId }: ApplyRequest,
  ): Promise<ApplicationResponse> {
    const application = await this.lectureService.apply(lectureId, userId);
    return ApplicationResponse.from(application);
  }
}
