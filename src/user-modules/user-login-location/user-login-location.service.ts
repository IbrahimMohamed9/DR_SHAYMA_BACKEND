import { Inject, Injectable } from '@nestjs/common';
import { CreateUserLoginLocationDto } from './dto/create-user-login-location.dto';
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
    const result = await this.uLLRepository.findOne({ where: { id } });
    if (!result) throw new Error('User login location not found');
    return result;
  }

  async findOneWithUser(id: number) {
    const result = await this.uLLRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!result) throw new Error('User login location not found');
    return result;
  }

  async findAllLoginLocationByUserId(userId: number) {
    return await this.uLLRepository.find({
      where: { userId },
    });
  }

  async findAllLoginLocationByUserIdWithUser(userId: number) {
    return await this.uLLRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }
}
