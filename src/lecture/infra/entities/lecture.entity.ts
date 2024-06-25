import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('lectures')
export class LectureEntity {
  @PrimaryUlid()
  id: string;

  @Column('text')
  name: string;

  @ColumnDatetime()
  createdDate: Date;

  @ColumnDatetime()
  updatedDate: Date;
}
