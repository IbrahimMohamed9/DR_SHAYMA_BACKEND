import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { Repository } from 'typeorm';
import { ArticleCategory } from './entities/article-category.entity';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @Inject('ARTICLE_CATEGORY_REPOSITORY')
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) {}

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    const newVolunteer = this.articleCategoryRepository.create(
      createArticleCategoryDto,
    );
    return await this.articleCategoryRepository.save(newVolunteer);
  }

  async findAll() {
    return await this.articleCategoryRepository.find();
  }

  async findOne(id: string) {
    return await this.articleCategoryRepository.findOne({
      where: { categoryId: id },
    });
  }

  async update(id: string, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    await this.articleCategoryRepository.update(id, updateArticleCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.articleCategoryRepository.delete(id);
  }
}
