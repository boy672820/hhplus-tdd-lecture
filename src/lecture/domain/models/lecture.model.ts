import { DomainError } from '@lib/errors';
import { ulid } from 'ulid';
import { User } from './user.model';
import { Application } from './application.model';

export interface LectureProps {
  id: string;
  name: string;
  date: Date;
  time: Date;
  maxParticipants: number;
  remainingSeats: number;
  createdDate: Date;
  updatedDate: Date;
}

export class Lecture implements LectureProps {
  private _id: string;
  private _name: string;
  private _date: Date;
  private _time: Date;
  private _maxParticipants: number;
  private _remainingSeats: number;
  private _createdDate: Date;
  private _updatedDate: Date;

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get date(): Date {
    return this._date;
  }
  get time(): Date {
    return this._time;
  }
  get maxParticipants(): number {
    return this._maxParticipants;
  }
  get remainingSeats(): number {
    return this._remainingSeats;
  }
  get createdDate(): Date {
    return this._createdDate;
  }
  get updatedDate(): Date {
    return this._updatedDate;
  }

  private constructor(props: LectureProps) {
    this._id = props.id;
    this._name = props.name;
    this._date = props.date;
    this._time = props.time;
    this._maxParticipants = props.maxParticipants;
    this._remainingSeats = props.remainingSeats;
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static create = (
    props: Pick<LectureProps, 'name' | 'date' | 'time' | 'maxParticipants'>,
  ): Lecture =>
    new Lecture({
      ...props,
      id: ulid(),
      remainingSeats: props.maxParticipants,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

  static from = (props: LectureProps): Lecture => new Lecture(props);

  applyUser(user: User): Application {
    if (this.remainingSeats === 0) {
      throw DomainError.limitExceeded('특강 신청이 마감되었습니다.');
    }

    this._remainingSeats -= 1;

    return Application.create({
      lectureId: this.id,
      userId: user.id,
    });
  }
}
