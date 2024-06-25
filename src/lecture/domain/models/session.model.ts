import { ulid } from 'ulid';
import { Lecture } from './lecture.model';
import { Participant } from './participant.model';
import { User } from './user.model';

interface Props {
  id: string;
  date: Date;
  time: Date;
  isPublished: boolean;
  maxParticipants: number;
  lecture: Lecture;
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
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static create = (props: CreateProps): Session =>
    new Session({
      ...props,
      id: ulid(),
      maxParticipants: props?.maxParticipants ?? 30,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

  static from = (props: FromProps): Session => new Session(props);

  applyUser(user: User): Participant {
    return Participant.from({
      userId: user.id,
      sessionId: this.id,
      realname: user.realname,
      email: user.email,
      phone: user.phone,
      participantedDate: new Date(),
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
    });
  }
}
