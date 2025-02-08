import { ApiProperty } from '@nestjs/swagger';
import { ArticleSubcategory } from 'src/article-subcategory/entities/article-subcategory.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column({ name: 'visited_times', default: 0 })
  visitedTimes?: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  img: string;

  @ApiProperty({ required: false })
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

  @ApiProperty()
  @Column('boolean', { default: false, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({ type: () => ArticleSubcategory })
  @ManyToOne(
    () => ArticleSubcategory,
    (articleSubcategory) => articleSubcategory.articles,
  )
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: ArticleSubcategory;

  @ApiProperty()
  @Column({ name: 'subcategory_id' })
  subcategoryId: string;

  @ApiProperty({ type: () => User, isArray: true })
  @ManyToMany(() => User, (user) => user.reviewedArticles)
  reviewers: User[];
}
