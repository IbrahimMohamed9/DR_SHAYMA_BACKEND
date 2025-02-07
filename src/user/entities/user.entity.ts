import { UserActivity } from 'src/user-activity/entities/user-activity.entity';
import { UserLoginLocation } from 'src/user-login-location/entities/user-login-location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' }) id: number;
  @Column({ default: 'user' }) possition: string;
  @Column() name: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column({ nullable: true }) img: string;
  @Column({ type: 'date' }) dob: Date;
  @Column({ unique: true }) phone: string;
  @Column() gender: string;
  @Column({ default: true }) active: boolean;
  @CreateDateColumn() createAt: Date;

  @OneToMany(() => UserLoginLocation, (uLL) => uLL.user, { cascade: true })
  userLoginLocations: UserLoginLocation[];

  @OneToMany(() => UserActivity, (activity) => activity.user, { cascade: true })
  userActivities: UserActivity[];
}
