import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Lecture, LectureCreateProps, LectureProps } from '../../domain/models';

@Injectable()
export class LectureFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create = (props: LectureCreateProps): Lecture =>
    this.eventPublisher.mergeObjectContext(Lecture.create(props));

  reconstitute = (props: LectureProps): Lecture =>
    this.eventPublisher.mergeObjectContext(Lecture.from(props));
}
