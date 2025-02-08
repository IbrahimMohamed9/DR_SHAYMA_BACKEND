import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'book_id' })
  id: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  img?: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ name: 'download_link' })
  downloadLink: string;
}
