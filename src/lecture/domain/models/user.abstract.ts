export interface UserProps {
  userId: string;
  realname: string;
  email: string;
  phone: string;
  createdDate: Date;
  updatedDate: Date;
}

export abstract class User implements UserProps {
  private _userId: string;
  private _realname: string;
  private _email: string;
  private _phone: string;
  private _createdDate: Date;
  private _updatedDate: Date;

  get userId() {
    return this._userId;
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

  protected constructor(props: UserProps) {
    this._userId = props.userId;
    this._realname = props.realname;
    this._email = props.email;
    this._phone = props.phone;
    this._createdDate = props.createdDate;
    this._updatedDate = props.updatedDate;
  }
}
