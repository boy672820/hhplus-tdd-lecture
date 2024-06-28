import { ulid } from 'ulid';

interface Props {
  id: string;
  realname: string;
  email: string;
  phone: string;
  createdDate: Date;
  updatedDate: Date;
}

export class User implements Props {
  private _id: string;
  private _realname: string;
  private _email: string;
  private _phone: string;
  private _createdDate: Date;
  private _updatedDate: Date;

  get id() {
    return this._id;
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
  get createdDate() {
    return this._createdDate;
  }
  get updatedDate() {
    return this._updatedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._realname = props.realname;
    this._email = props.email;
    this._phone = props.phone;
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }

  static create = (props: Pick<Props, 'realname' | 'email' | 'phone'>): User =>
    new User({
      ...props,
      id: ulid(),
      createdDate: new Date(),
      updatedDate: new Date(),
    });

  static from = (props: Props): User => new User(props);
}
