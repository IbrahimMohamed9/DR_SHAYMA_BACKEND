import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = hash('sha256', newUser.password);

    const checkEmail = await this.findByEmail(newUser.email);
    if (checkEmail) return new BadRequestException('Email already exists');
    const checkPhone = await this.findByPhone(newUser.phone);
    if (checkPhone) return new BadRequestException('Phone already exists');

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByPhone(phone: string) {
    return await this.userRepository.findOne({ where: { phone } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password)
      updateUserDto.password = hash('sha256', updateUserDto.password);

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
