import { Injectable } from '@nestjs/common';

import { Book } from './interface';
import { CreateBookDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  private readonly books: Book[] = [];

  create(data: CreateBookDto) {
    return this.prisma.book.create({ data: { ...data, created_by: 1 } });
    // return this.books.push(book);
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }
}
