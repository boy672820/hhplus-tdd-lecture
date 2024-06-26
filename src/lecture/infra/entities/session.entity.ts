import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LectureEntity } from './lecture.entity';
import { ApplicationEntity } from './application.entity';

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
  @JoinColumn({ name: 'lecture_id' })
  lecture: LectureEntity;

  @OneToMany(() => ApplicationEntity, (application) => application.session)
  applications: ApplicationEntity[];
}
