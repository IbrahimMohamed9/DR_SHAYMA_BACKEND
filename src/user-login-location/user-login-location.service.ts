import { Inject, Injectable } from '@nestjs/common';
import { CreateUserLoginLocationDto } from './dto/create-user-login-location.dto';
import { UpdateUserLoginLocationDto } from './dto/update-user-login-location.dto';
import { Repository } from 'typeorm';
import { UserLoginLocation } from './entities/user-login-location.entity';

@Injectable()
export class UserLoginLocationService {
  constructor(
    @Inject('USER_LOGIN_LOCATION_REPOSITORY')
    private uLLRepository: Repository<UserLoginLocation>,
  ) {}
  async create(createUserLoginLocationDto: CreateUserLoginLocationDto) {
    const uLL = this.uLLRepository.create(createUserLoginLocationDto);
    return await this.uLLRepository.save(uLL);
  }

  async findAll() {
    return await this.uLLRepository.find();
  }
  async findAllWithUser() {
    return await this.uLLRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return await this.uLLRepository.find({ where: { id } });
  }

  async findOneWithUser(id: number) {
    return await this.uLLRepository.find({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateUserLoginLocationDto: UpdateUserLoginLocationDto,
  ) {
    await this.uLLRepository.update(id, updateUserLoginLocationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.uLLRepository.delete(id);
  }
}
