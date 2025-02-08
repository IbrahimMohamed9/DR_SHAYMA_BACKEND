import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;
}
