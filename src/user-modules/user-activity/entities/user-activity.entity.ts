import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user-modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn({ name: 'user_activity_id' })
  id: number;

  @ApiProperty()
  @Column()
  activity: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ required: false })
  @Column({ name: 'user_id', nullable: true, type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.userActivities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User })
  user: User;
}
