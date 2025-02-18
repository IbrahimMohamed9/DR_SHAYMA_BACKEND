import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateVolunteerDto {
  @ApiProperty({
    example:
      'https://the7eagles.com/wp-content/uploads/2024/05/Parts-of-Image-URL-1.webp',
    required: false,
  })
  @IsUrl()
  img?: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty({ example: '+201110472777' })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({ example: 'ibrahim@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ibrahim Mohamed' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://api.whatsapp.com/send?phone=387603412169' })
  @IsUrl()
  whatsapp: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/ibrahim-mohamed-33bb2125a/',
  })
  @IsUrl()
  linkedin: string;
}
