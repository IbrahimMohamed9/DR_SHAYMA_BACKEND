import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'visited_times', default: 0 })
  visitedTimes: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  img: string;

  @ApiProperty()
  @Column({ name: 'img_description', nullable: true })
  imgDescription?: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  // subcategory fk
  @ApiProperty()
  @Column({ name: 'subcategory_id' })
  subcategoryId: string;

  @ApiProperty()
  @Column('boolean', { default: false, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({ type: () => User, isArray: true })
  @ManyToMany(() => User, (user) => user.reviewedArticles)
  reviewers: User[];
}
