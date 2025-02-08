import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'ip_address' })
  ipAddress: string;

  @ApiProperty()
  @Column({ type: 'int', name: 'user_id', nullable: true })
  userId: number;
  @ApiProperty()
  @CreateDateColumn({ name: 'login_time' })
  loginTime: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.userLoginLocations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
