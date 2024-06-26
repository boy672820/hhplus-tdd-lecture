import { ulid } from 'ulid';
import { Lecture } from './lecture.model';
import { Application } from './application.model';
import { Participant } from './participant.model';
import { DomainError } from '../../../lib/errors';

interface Props {
  id: string;
  date: Date;
  time: Date;
  isPublished: boolean;
  maxParticipants: number;
  lecture: Lecture;
  applications: Application[];
  createdDate: Date;
  updatedDate: Date;
}

interface CreateProps
  extends Pick<Props, 'date' | 'time' | 'isPublished' | 'lecture'> {
  maxParticipants: number;
}

interface FromProps
  extends Pick<
    Props,
    | 'id'
    | 'date'
    | 'time'
    | 'isPublished'
    | 'maxParticipants'
    | 'lecture'
    | 'applications'
    | 'createdDate'
    | 'updatedDate'
  > {}

export class Session implements Props {
  private _id: string;
  private _date: Date;
  private _time: Date;
  private _isPublished: boolean;
  private _maxParticipants: number;
  private _lecture: Lecture;
  private _applications: Application[];
  private _createdDate: Date;
  private _updatedDate: Date;

  get id(): string {
    return this._id;
  }
  get date(): Date {
    return this._date;
  }
  get time(): Date {
    return this._time;
  }
  get isPublished(): boolean {
    return this._isPublished;
  }
  get maxParticipants(): number {
    return this._maxParticipants;
  }
  get lecture(): Lecture {
    return this._lecture;
  }
  get applications(): Application[] {
    return this._applications;
  }
  get createdDate(): Date {
    return this._createdDate;
  }
  get updatedDate(): Date {
    return this._updatedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._date = props.date;
    this._time = props.time;
    this._isPublished = props.isPublished;
    this._maxParticipants = props.maxParticipants;
    this._applications = props.applications;
    this._lecture = props.lecture;
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static create = (props: CreateProps): Session =>
    new Session({
      ...props,
      id: ulid(),
      maxParticipants: props?.maxParticipants ?? 30,
      applications: [],
      createdDate: new Date(),
      updatedDate: new Date(),
    });

  static from = (props: FromProps): Session => new Session(props);

  // enterUser(user: User): Participant {}

  applyParticipant(participant: Participant): Application {
    if (this._applications.length === this.maxParticipants) {
      throw DomainError.limitExceeded('참가자가 모두 모집되었습니다.');
    }

    const newApplication = Application.create({
      userId: participant.userId,
      sessionId: this.id,
      realname: participant.realname,
      email: participant.email,
      phone: participant.phone,
      createdDate: participant.createdDate,
      updatedDate: participant.updatedDate,
    });
    this._applications.push(newApplication);
    this._updatedDate = new Date();
    return newApplication;
  }
}
