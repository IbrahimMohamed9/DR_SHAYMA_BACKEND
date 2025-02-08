import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userLoginLocationProviders } from 'src/user-login-location/user-login-location.provider';
import { userProviders } from 'src/user/user.provider';
import { UsersService } from 'src/user/user.service';
import { UserLoginLocationService } from 'src/user-login-location/user-login-location.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    ...userLoginLocationProviders,
    ...userProviders,
    AuthService,
    UsersService,
    UserLoginLocationService,
  ],
})
export class AuthModule {}
