import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserActivity {
  @PrimaryGeneratedColumn({ name: 'user_activity_id' }) id: number;
  @Column() activity: string;
  @CreateDateColumn() createAt: Date;
  @Column({ name: 'user_id', nullable: true, type: 'int' }) userId: number;

  @ManyToOne(() => User, (user) => user.userActivities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
