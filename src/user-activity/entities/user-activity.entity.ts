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
export class UserActivity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'user_activity_id' })
  id: number;

  @ApiProperty()
  @Column()
  activity: string;

  @ApiProperty()
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: true, type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.userActivities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User })
  user: User;
}
