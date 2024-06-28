import { Application } from '../../domain/models';

interface Props {
  appliedDate: Date;
}

export class ApplicationResponse implements Props {
  public readonly appliedDate: Date;

  private constructor(props: Props) {
    Object.assign(this, props);
  }

  static from = (application: Application): ApplicationResponse =>
    new ApplicationResponse({
      appliedDate: application.appliedDate,
    });
}
