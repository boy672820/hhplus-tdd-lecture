import { Participant } from '../models';

export const PARTICIPANT_REPOSITORY = Symbol.for('PARTICIPANT_REPOSITORY');

export type CompositeKey = {
  sessionId: string;
  userId: string;
};

export interface ParticipantRepository {
  findById(composite: CompositeKey): Promise<Participant | null>;
  save(participant: Participant): Promise<void>;
  exists(composite: CompositeKey): Promise<boolean>;
}
