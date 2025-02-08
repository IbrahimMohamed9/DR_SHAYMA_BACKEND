import { ApiProperty } from '@nestjs/swagger';
import { FeedbackCategory } from 'src/feedback-category/entities/feedback-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'feedback_id' })
  id: number;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ name: 'category_id', nullable: true })
  category: string;

  @ApiProperty()
  @OneToMany(() => FeedbackCategory, (fC) => fC.feedbacks, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  feedbackCategory: FeedbackCategory;
}
