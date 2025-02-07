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
export class UserLoginLocation {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'ip_address' }) ipAddress: string;
  @Column({ type: 'int', name: 'user_id', nullable: true }) userId: number;
  @CreateDateColumn({ name: 'login_time' }) loginTime: Date;

  @ManyToOne(() => User, (user) => user.userLoginLocations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
