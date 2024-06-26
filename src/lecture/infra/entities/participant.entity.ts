import { ColumnDatetime, ColumnUlid, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('participants')
export class ParticipantEntity {
  @PrimaryUlid({ name: 'participant_id' })
  id: string;

  @ColumnUlid({ name: 'lecture_id' })
  lectureId: string;

  @Column()
  realname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @ColumnDatetime({ name: 'participanted_date' })
  participantedDate: Date;
}
