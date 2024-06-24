import { ulid } from 'ulid';

interface Props {
  id: string;
  realname: string;
  email: string;
  phone: string;
  participantedDate: Date;
}

export class Participant implements Props {
  private _id: string;
  private _realname: string;
  private _email: string;
  private _phone: string;
  private _participantedDate: Date;

  get id(): string {
    return this._id;
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

  private constructor(props: Props) {
    this._id = props.id;
    this._realname = props.realname;
    this._email = props.email;
    this._phone = props.phone;
    this._participantedDate = props.participantedDate;
  }

  static from = (props: Props): Participant => new Participant(props);

  static create = (
    props: Pick<Props, 'realname' | 'email' | 'phone' | 'participantedDate'>,
  ): Participant => new Participant({ id: ulid(), ...props });
}
