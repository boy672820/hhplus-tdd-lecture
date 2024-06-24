import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('participants')
export class ParticipantEntity {
  @PrimaryUlid({ name: 'session_id' })
  sessionId: string;

  @ColumnDatetime({ name: 'participanted_date' })
  participantedDate: Date;

  @ManyToOne(() => UserEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
