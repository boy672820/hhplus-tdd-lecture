import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SessionEntity } from './session.entity';
import { ParticipantEntity } from './participant.entity';

@Entity('applications')
export class ApplicationEntity {
  @PrimaryUlid({ name: 'application_id' })
  id: string;

  @ColumnDatetime({ name: 'applied_date' })
  appliedDate: Date;

  @ManyToOne(() => SessionEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @ManyToOne(() => ParticipantEntity, { cascade: true, nullable: false })
  @JoinColumn([
    { name: 'session_id', referencedColumnName: 'sessionId' },
    { name: 'user_id', referencedColumnName: 'userId' },
  ])
  participant: ParticipantEntity;
}
