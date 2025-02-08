import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from './book.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...bookProviders, BookService],
})
export class BookModule {}
