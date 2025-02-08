import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleSubcategoryDto } from './dto/create-article-subcategory.dto';
import { UpdateArticleSubcategoryDto } from './dto/update-article-subcategory.dto';
import { Repository } from 'typeorm';
import { ArticleSubcategory } from './entities/article-subcategory.entity';

@Injectable()
export class ArticleSubcategoryService {
  constructor(
    @Inject('ARTICLE_SUBCATEGORY_REPOSITORY')
    private articleSubcategoryRepository: Repository<ArticleSubcategory>,
  ) {}

  async create(createArticleSubcategoryDto: CreateArticleSubcategoryDto) {
    const newVolunteer = this.articleSubcategoryRepository.create(
      createArticleSubcategoryDto,
    );
    return await this.articleSubcategoryRepository.save(newVolunteer);
  }

  async findAll() {
    return await this.articleSubcategoryRepository.find();
  }

  async findOne(id: string) {
    return await this.articleSubcategoryRepository.findOne({
      where: { subcategoryId: id },
    });
  }

  async update(
    id: string,
    updateArticleSubcategoryDto: UpdateArticleSubcategoryDto,
  ) {
    await this.articleSubcategoryRepository.update(
      id,
      updateArticleSubcategoryDto,
    );
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.articleSubcategoryRepository.delete(id);
  }
}
