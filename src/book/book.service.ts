import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update(id, updateBookDto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.bookRepository.delete(id);
  }
}
