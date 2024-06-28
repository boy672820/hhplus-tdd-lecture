export class UserAppliedEvent {
  constructor(
    public readonly userId: string,
    public readonly lectureId: string,
  ) {}
}
