import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { volunteerProviders } from './volunteer.provider';

@Module({
  imports: [DatabaseModule],

  controllers: [VolunteerController],
  providers: [...volunteerProviders, VolunteerService],
})
export class VolunteerModule {}
