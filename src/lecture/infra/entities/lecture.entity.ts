import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('lectures')
export class LectureEntity {
  @PrimaryUlid({ name: 'lecture_id' })
  id: string;

  @Column('text')
  name: string;

  @ColumnDatetime({ name: 'created_date' })
  createdDate: Date;

  @ColumnDatetime({ name: 'updated_date' })
  updatedDate: Date;
}
