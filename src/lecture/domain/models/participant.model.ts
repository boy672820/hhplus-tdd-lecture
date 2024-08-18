import { ulid } from 'ulid';

interface Props {
  id: string;
  lectureId: string;
  realname: string;
  email: string;
  phone: string;
  participantedDate: Date;
}

export class Participant implements Props {
  private _id: string;
  private _lectureId: string;
  private _realname: string;
  private _email: string;
  private _phone: string;
  private _participantedDate: Date;

  get id() {
    return this._id;
  }
  get lectureId() {
    return this._lectureId;
  }
  get realname() {
    return this._realname;
  }
  get email() {
    return this._email;
  }
  get phone() {
    return this._phone;
  }
  get participantedDate() {
    return this._participantedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._lectureId = props.lectureId;
    this._realname = props.realname;
    this._email = props.email;
    this._phone = props.phone;
    this._participantedDate = props.participantedDate;
  }

  static create = (
    props: Pick<Props, 'lectureId' | 'realname' | 'email' | 'phone'>,
  ): Participant =>
    new Participant({ ...props, id: ulid(), participantedDate: new Date() });

  static from = (props: Props): Participant => new Participant(props);
}
