import { UserLoginLocationService } from './../user-modules/user-login-location/user-login-location.service';
import { UsersService } from '../user-modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user-modules/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private userLoginLocationService: UserLoginLocationService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, ip: string) {
    const { email } = loginDto;
    const errorMsg = 'Invalid Email or Password';

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException(errorMsg);

    const password = hash('sha256', loginDto.password);

    if (user.password !== password) throw new UnauthorizedException(errorMsg);

    this.userLoginLocationService.create({
      ipAddress: ip,
      userId: user.id,
    });

    delete user.password;
    delete user.active;
    delete user.createdAt;

    return {
      accessToken: this.jwtService.sign({ user }),
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
