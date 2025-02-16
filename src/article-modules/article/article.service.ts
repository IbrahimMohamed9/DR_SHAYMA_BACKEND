import { ArticleSubcategoryService } from './../article-subcategory/article-subcategory.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
    private readonly articleSubcategoryService: ArticleSubcategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const articleSubcategory = await this.articleSubcategoryService.findOne(
      createArticleDto.subcategoryId,
    );

    if (!articleSubcategory) {
      throw new Error('Article subcategory not found');
    }

    const newArticle = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(newArticle);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  async findOne(id: number) {
    return await this.articleRepository.findOne({ where: { id } });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.articleRepository.delete(id);
  }
}
