import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { UserEntity } from './user.entity';
import { LectureEntity } from './lecture.entity';

@Entity('applications')
@Unique(['user', 'lecture'])
export class ApplicationEntity {
  @PrimaryUlid({ name: 'application_id' })
  id: string;

  @ColumnDatetime({ name: 'applied_date' })
  appliedDate: Date;

  @ManyToOne(() => UserEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => LectureEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'lecture_id' })
  lecture: LectureEntity;
}
