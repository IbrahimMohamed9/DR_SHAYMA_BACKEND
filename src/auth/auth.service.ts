import { CreateUserLoginLocationDto } from './../user-login-location/dto/create-user-login-location.dto';
import { UserLoginLocationService } from './../user-login-location/user-login-location.service';
import { UsersService } from '../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly userLoginLocationService: UserLoginLocationService,
  ) {}

  async login(loginDto: LoginDto, ip: string) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const userLogin: CreateUserLoginLocationDto = {
      ipAddress: ip,
      userId: user.id,
    };
    this.userLoginLocationService.create(userLogin);

    return userLogin;
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
