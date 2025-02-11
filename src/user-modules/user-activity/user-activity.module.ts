import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';
import { userActivityProviders } from './user-activity.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserActivityController],
  providers: [...userActivityProviders, UserActivityService],
})
export class UserActivityModule {}
