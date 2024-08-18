import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('lectures')
export class LectureEntity {
  @PrimaryUlid({ name: 'lecture_id' })
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'int', name: 'max_participants' })
  maxParticipants: number;

  @Column({ type: 'int', name: 'remaining_seats' })
  remainingSeats: number;

  @ColumnDatetime({ name: 'created_date' })
  createdDate: Date;

  @ColumnDatetime({ name: 'updated_date' })
  updatedDate: Date;
}
