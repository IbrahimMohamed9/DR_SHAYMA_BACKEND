import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { Repository } from 'typeorm';
import { UserActivity } from './entities/user-activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @Inject('USER_ACTIVITY_REPOSITORY')
    private userActivityRepository: Repository<UserActivity>,
  ) {}
  async create(createUserActivityDto: CreateUserActivityDto, user: any) {
    if (!user || !user?.id)
      throw new UnauthorizedException('User not authenticated');

    const newActivity = this.userActivityRepository.create({
      activity: createUserActivityDto.activity,
      userId: user.id,
    });

    try {
      return await this.userActivityRepository.save(newActivity);
    } catch (error) {
      throw new Error('Error creating user activity: ' + error.message);
    }
  }

  async findAll() {
    return await this.userActivityRepository.find();
  }

  async findAllWithUser() {
    return await this.userActivityRepository.find({
      relations: ['user'],
    });
  }

  async findAllByUserId(userId: number) {
    return await this.userActivityRepository.find({
      where: { userId },
    });
  }

  async findAllByUserIdWithUser(userId: number) {
    return await this.userActivityRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const result = await this.userActivityRepository.findOne({ where: { id } });
    if (!result) throw new Error('User activity not found');
    return result;
  }

  async findOneWithUser(id: number) {
    const result = await this.userActivityRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!result) throw new Error('User activity not found');
    return result;
  }
}
