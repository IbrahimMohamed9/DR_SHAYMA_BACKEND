import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Volunteer {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn({ name: 'volunteer_id' })
  id: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  img?: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  whatsapp: string;

  @ApiProperty()
  @Column()
  linkedin: string;
}
