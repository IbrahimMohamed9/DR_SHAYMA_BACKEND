import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserLoginLocationService } from 'src/user-login-location/user-login-location.service';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProvider, UsersService, UserLoginLocationService],
})
export class UsersModule {}
