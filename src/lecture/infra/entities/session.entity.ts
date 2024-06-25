import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LectureEntity } from './lecture.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryUlid({ name: 'session_id' })
  id: string;

  @Column('date')
  date: Date;

  @Column('time')
  time: Date;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column('int')
  maxParticipants: number;

  @ColumnDatetime()
  createdDate: Date;

  @ColumnDatetime()
  updatedDate: Date;

  @ManyToOne(() => LectureEntity, { cascade: true, nullable: false })
  lecture: LectureEntity;
}
