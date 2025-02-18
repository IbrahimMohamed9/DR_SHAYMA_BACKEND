import { Body, Controller, HttpCode, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user-modules/user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Ip() ip) {
    return this.authService.login(loginDto, ip);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    delete createUserDto.role;

    return this.authService.register(createUserDto);
  }
}
