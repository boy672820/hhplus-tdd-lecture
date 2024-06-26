import { Participant } from '../models';

export const PARTICIPANT_REPOSITORY = Symbol.for('PARTICIPANT_REPOSITORY');

export interface ParticipantRepository {
  save(participant: Participant): Promise<void>;
}
