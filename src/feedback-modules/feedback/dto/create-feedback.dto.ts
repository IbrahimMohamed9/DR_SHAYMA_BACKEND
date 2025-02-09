import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: false })
  senderName: string;

  @ApiProperty({ required: false })
  senderEmail: string;

  @ApiProperty({ required: false })
  senderPhone: string;
}
