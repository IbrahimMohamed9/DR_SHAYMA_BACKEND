import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ArticleCategory {
  @ApiProperty()
  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;
}
