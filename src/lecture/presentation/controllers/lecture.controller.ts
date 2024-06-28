import { ResponseEntity } from '@lib/types';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApplicationResponse, LectureResponse } from '../responses';
import { LectureService } from '../../application/services';
import { ApplyRequest } from '../requests';

@Controller('lectures')
export class LectureController {
  constructor(@Inject() private readonly lectureService: LectureService) {}

  /**
   * 특강 전체 목록을 조회합니다.
   */
  @Get()
  async findAll(): Promise<ResponseEntity<LectureResponse[]>> {
    const lectures = await this.lectureService.findAll();
    return ResponseEntity.okWith(lectures.map(LectureResponse.from));
  }

  /**
   * 특강을 신청합니다.
   */
  @Post(':lectureId/apply')
  async apply(
    @Param('lectureId') lectureId: string,
    @Body() { userId }: ApplyRequest,
  ): Promise<ResponseEntity<ApplicationResponse>> {
    const application = await this.lectureService.apply(lectureId, userId);
    return ResponseEntity.okWith(ApplicationResponse.from(application));
  }

  /**
   * 특강 신청 여부를 조회합니다.
   */
  @Get(':lectureId/applications/:userId')
  async isApplied(
    @Param('lectureId') lectureId: string,
    @Param('userId') userId: string,
  ): Promise<ResponseEntity<boolean>> {
    const isApplied = await this.lectureService.isApplied(lectureId, userId);
    return ResponseEntity.okWith(isApplied);
  }
}
