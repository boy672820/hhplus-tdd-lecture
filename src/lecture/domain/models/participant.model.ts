interface Props {
  sessionId: string;
  userId: string;
  realname: string;
  email: string;
  phone: string;
  participantedDate: Date;
  createdDate: Date;
  updatedDate: Date;
}

export class Participant implements Props {
  private _sessionId: string;
  private _userId: string;
  private _realname: string;
  private _email: string;
  private _phone: string;
  private _participantedDate: Date;
  private _createdDate: Date;
  private _updatedDate: Date;

  get sessionId(): string {
    return this._sessionId;
  }
  get userId(): string {
    return this._userId;
  }
  get realname(): string {
    return this._realname;
  }
  get email(): string {
    return this._email;
  }
  get phone(): string {
    return this._phone;
  }
  get participantedDate(): Date {
    return this._participantedDate;
  }
  get createdDate(): Date {
    return this._createdDate;
  }
  get updatedDate(): Date {
    return this._updatedDate;
  }

  private constructor(props: Props) {
    this._sessionId = props.sessionId;
    this._userId = props.userId;
    this._realname = props.realname;
    this._email = props.email;
    this._phone = props.phone;
    this._participantedDate = props.participantedDate;
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static from = (props: Props): Participant => new Participant(props);

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
  ): Participant =>
    new Participant({ ...props, participantedDate: new Date() });
}
