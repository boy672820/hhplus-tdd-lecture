import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('lectures')
export class LectureEntity {
  @PrimaryUlid({ name: 'lecture_id' })
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: Date;

  @Column({ type: 'int', name: 'max_participants' })
  maxParticipants: number;

  @Column({ type: 'int', name: 'remaing_seats' })
  remainingSeats: number;

  @ColumnDatetime({ name: 'created_date' })
  createdDate: Date;

  @ColumnDatetime({ name: 'updated_date' })
  updatedDate: Date;
}
