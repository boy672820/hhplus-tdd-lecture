import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAppliedEvent } from '../../domain/events';
import {
  PARTICIPANT_REPOSITORY,
  ParticipantRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';
import { Participant } from '../../domain/models';

@EventsHandler(UserAppliedEvent)
export class UserAppliedHandler implements IEventHandler<UserAppliedEvent> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository: UserRepository,
    @Inject(PARTICIPANT_REPOSITORY)
    private readonly participantRepository: ParticipantRepository,
  ) {}

  async handle(event: UserAppliedEvent): Promise<void> {
    const { userId, lectureId } = event;

    const user = await this.repository.findById(userId);

    if (!user) {
      return;
    }

    const newParticipant = Participant.create({
      lectureId,
      realname: user.realname,
      email: user.email,
      phone: user.phone,
    });

    await this.participantRepository.save(newParticipant);
  }
}
