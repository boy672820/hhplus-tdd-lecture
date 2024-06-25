import { ulid } from 'ulid';

export interface LectureProps {
  id: string;
  name: string;
  createdDate: Date;
  updatedDate: Date;
}

export class Lecture implements LectureProps {
  private _id: string;
  private _name: string;
  private _createdDate: Date;
  private _updatedDate: Date;

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
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
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static create = (props: Pick<LectureProps, 'name'>): Lecture =>
    new Lecture({
      ...props,
      id: ulid(),
      createdDate: new Date(),
      updatedDate: new Date(),
    });

  static from = (props: LectureProps): Lecture => new Lecture(props);
}
