import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Entity } from 'typeorm';

@Entity('applications')
export class ApplicationEntity {
  @PrimaryUlid({ name: 'session_id' })
  sessionId: string;

  @PrimaryUlid({ name: 'user_id' })
  userId: string;

  @ColumnDatetime({ name: 'applied_date' })
  appliedDate: Date;
}
