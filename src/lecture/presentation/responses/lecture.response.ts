import { Lecture } from '../../domain/models';

interface Props {
  id: string;
  name: string;
  date: string;
  time: string;
  maxParticipants: number;
  remainingSeats: number;
  createdDate: Date;
  updatedDate: Date;
}

export class LectureResponse implements Props {
  public id: string;
  public name: string;
  public date: string;
  public time: string;
  public maxParticipants: number;
  public remainingSeats: number;
  public createdDate: Date;
  public updatedDate: Date;

  private constructor(props: Props) {
    Object.assign(this, props);
  }

  static from = (lecture: Lecture): LectureResponse =>
    new LectureResponse({
      id: lecture.id,
      name: lecture.name,
      date: lecture.date.toString(),
      time: lecture.time.toString(),
      maxParticipants: lecture.maxParticipants,
      remainingSeats: lecture.remainingSeats,
      createdDate: lecture.createdDate,
      updatedDate: lecture.updatedDate,
    });
}
