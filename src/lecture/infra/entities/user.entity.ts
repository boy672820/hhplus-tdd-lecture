import { ColumnDatetime, PrimaryUlid } from '@lib/decorators';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryUlid({ name: 'user_id' })
  id: string;

  @Column()
  realname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @ColumnDatetime({ name: 'created_date' })
  createdDate: Date;

  @ColumnDatetime({ name: 'updated_date' })
  updatedDate: Date;
}
