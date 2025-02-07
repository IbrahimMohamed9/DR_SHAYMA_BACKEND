import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserLoginLocation {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'ip_address' }) ipAddress: string;

  @ManyToOne(() => User, (user) => user.userLoginLocations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'login_time' })
  loginTime: Date;
}
