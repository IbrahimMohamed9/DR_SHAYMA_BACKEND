import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'src/article-modules/article/entities/article.entity';
import { UserActivity } from 'src/user-modules/user-activity/entities/user-activity.entity';
import { UserLoginLocation } from 'src/user-modules/user-login-location/entities/user-login-location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @ApiProperty()
  @Column({ default: 'user' })
  position: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  img: string;

  @ApiProperty()
  @Column({ type: 'date' })
  dob: Date;

  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @ApiProperty()
  @Column()
  gender: string;

  @ApiProperty()
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => UserLoginLocation })
  @OneToMany(() => UserLoginLocation, (uLL) => uLL.user, { cascade: true })
  userLoginLocations: UserLoginLocation[];

  @ApiProperty({ type: () => UserActivity, isArray: true })
  @OneToMany(() => UserActivity, (activity) => activity.user, { cascade: true })
  userActivities: UserActivity[];

  @ApiProperty({ type: () => Article, isArray: true })
  @ManyToMany(() => Article, (article) => article.reviewers)
  @JoinTable({ name: 'user_reviewed_articles' })
  reviewedArticles: Article[];
}
