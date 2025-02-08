import { Inject, Injectable } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Repository } from 'typeorm';
import { Volunteer } from './entities/volunteer.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @Inject('VOLUNTEER_REPOSITORY')
    private volunteerRepository: Repository<Volunteer>,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto) {
    const newVolunteer = this.volunteerRepository.create(createVolunteerDto);
    return await this.volunteerRepository.save(newVolunteer);
  }

  async findAll() {
    return await this.volunteerRepository.find();
  }

  async findOne(id: number) {
    return await this.volunteerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateVolunteerDto: UpdateVolunteerDto) {
    await this.volunteerRepository.update(id, updateVolunteerDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.volunteerRepository.delete(id);
  }
}
