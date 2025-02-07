import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserLoginLocationModule } from './user-login-location/user-login-location.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, UserLoginLocationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
