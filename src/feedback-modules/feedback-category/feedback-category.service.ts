import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackCategoryDto } from './dto/create-feedback-category.dto';
import { UpdateFeedbackCategoryDto } from './dto/update-feedback-category.dto';
import { Repository } from 'typeorm';
import { FeedbackCategory } from './entities/feedback-category.entity';

@Injectable()
export class FeedbackCategoryService {
  constructor(
    @Inject('FEEDBACK_CATEGORY_REPOSITORY')
    private feedbackCategoryRepository: Repository<FeedbackCategory>,
  ) {}

  async create(createFeedbackCategoryDto: CreateFeedbackCategoryDto) {
    const newFeedbackCategory = this.feedbackCategoryRepository.create(
      createFeedbackCategoryDto,
    );

    return await this.feedbackCategoryRepository.save(newFeedbackCategory);
  }

  async findAll() {
    return await this.feedbackCategoryRepository.find();
  }

  async findOne(id: string) {
    return await this.feedbackCategoryRepository.findOne({
      where: { category: id },
    });
  }

  async update(
    id: string,
    updateFeedbackCategoryDto: UpdateFeedbackCategoryDto,
  ) {
    await this.feedbackCategoryRepository.update(id, updateFeedbackCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.feedbackCategoryRepository.delete(id);
  }
}
