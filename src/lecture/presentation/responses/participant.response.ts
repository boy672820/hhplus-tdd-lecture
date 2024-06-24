interface Props {
  realname: string;
  email: string;
  phone: string;
  participantedDate: Date;
}

export class ParticipantResponse implements Props {
  public readonly realname: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly participantedDate: Date;

  private constructor(props: Props) {
    Object.assign(this, props);
  }

  static from(props: Props): ParticipantResponse {
    return new ParticipantResponse(props);
  }
}
