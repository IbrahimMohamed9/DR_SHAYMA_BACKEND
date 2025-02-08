import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Volunteer {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'volunteer_id' })
  id: number;

  @ApiProperty()
  @Column()
  img: string;

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
