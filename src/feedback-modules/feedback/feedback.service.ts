import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('FEEDBACK_REPOSITORY')
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const newFeedback = this.feedbackRepository.create(createFeedbackDto);
    return await this.feedbackRepository.save(newFeedback);
  }

  async findAll() {
    return await this.feedbackRepository.find();
  }

  async findOne(id: number) {
    return await this.feedbackRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    await this.feedbackRepository.update(id, updateFeedbackDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.feedbackRepository.delete(id);
  }
}
