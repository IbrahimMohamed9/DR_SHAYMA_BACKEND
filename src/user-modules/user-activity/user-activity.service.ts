import { Inject, Injectable } from '@nestjs/common';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';
import { Repository } from 'typeorm';
import { UserActivity } from './entities/user-activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @Inject('USER_ACTIVITY_REPOSITORY')
    private userActivityRepository: Repository<UserActivity>,
  ) {}
  async create(createUserActivityDto: CreateUserActivityDto) {
    const newActivity = this.userActivityRepository.create(
      createUserActivityDto,
    );
    return await this.userActivityRepository.save(newActivity);
  }

  async findAll() {
    return await this.userActivityRepository.find();
  }

  async findOne(id: number) {
    return await this.userActivityRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserActivityDto: UpdateUserActivityDto) {
    await this.userActivityRepository.update(id, updateUserActivityDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userActivityRepository.delete(id);
  }
}
