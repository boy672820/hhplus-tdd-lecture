import { ulid } from 'ulid';

interface Props {
  id: string;
  lectureId: string;
  userId: string;
  appliedDate: Date;
}

export class Application implements Props {
  private _id: string;
  private _lectureId: string;
  private _userId: string;
  private _appliedDate: Date;

  get id(): string {
    return this._id;
  }
  get lectureId(): string {
    return this._lectureId;
  }
  get userId(): string {
    return this._userId;
  }
  get appliedDate(): Date {
    return this._appliedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._lectureId = props.lectureId;
    this._userId = props.userId;
    this._appliedDate = props.appliedDate;
  }

  static create = (props: Pick<Props, 'lectureId' | 'userId'>): Application =>
    new Application({ ...props, id: ulid(), appliedDate: new Date() });

  static from = (props: Props): Application => new Application(props);
}
