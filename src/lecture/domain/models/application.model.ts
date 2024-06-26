import { ulid } from 'ulid';
import { User, UserProps } from './user.abstract';

interface Props extends UserProps {
  id: string;
  sessionId: string;
  appliedDate: Date;
}

export class Application extends User implements Props {
  private _id: string;
  private _sessionId: string;
  private _appliedDate: Date;

  get id(): string {
    return this._id;
  }
  get sessionId(): string {
    return this._sessionId;
  }
  get appliedDate(): Date {
    return this._appliedDate;
  }

  private constructor(props: Props) {
    super(props);
    this._id = props.id;
    this._sessionId = props.sessionId;
    this._appliedDate = props.appliedDate;
  }

  static from = (props: Props): Application => new Application(props);

  static create = (
    props: Pick<
      Props,
      | 'sessionId'
      | 'userId'
      | 'realname'
      | 'email'
      | 'phone'
      | 'createdDate'
      | 'updatedDate'
    >,
  ): Application =>
    new Application({ ...props, id: ulid(), appliedDate: new Date() });
}
