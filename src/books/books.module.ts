import { Module, Global } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookService } from './books.service';

// @Global()
@Module({
  controllers: [BooksController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
