import { User, UserProps } from './user.abstract';

interface Props extends UserProps {
  sessionId: string;
  participantedDate: Date;
}

export class Participant extends User implements Props {
  private _sessionId: string;
  private _participantedDate: Date;

  get sessionId(): string {
    return this._sessionId;
  }
  get participantedDate(): Date {
    return this._participantedDate;
  }

  private constructor(props: Props) {
    super(props);
    this._sessionId = props.sessionId;
    this._participantedDate = props.participantedDate;
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
