import { Module } from '@nestjs/common';
import { UserLoginLocationService } from './user-login-location.service';
import { UserLoginLocationController } from './user-login-location.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userLoginLocationProviders } from './user-login-location.provider';

@Module({
  controllers: [UserLoginLocationController],
  imports: [DatabaseModule],
  exports: [UserLoginLocationService],
  providers: [...userLoginLocationProviders, UserLoginLocationService],
})
export class UserLoginLocationModule {}
