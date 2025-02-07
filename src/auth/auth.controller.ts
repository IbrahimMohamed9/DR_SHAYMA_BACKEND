import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Ip() ip) {
    return this.authService.login(loginDto, ip);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
