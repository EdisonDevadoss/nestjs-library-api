import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateBookDto } from './dto';
import { BookService } from './books.service';
import { Book } from './interface';

@Controller('books')
@UseFilters(new HttpExceptionFilter())
export class BooksController {
  constructor(private bookServer: BookService) {}
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    console.log('createBookDto', createBookDto);
    return this.bookServer.create(createBookDto);
  }

  @Get()
  async getAll(@Req() request: Request): Promise<Book[]> {
    // console.log('request is', request);
    throw new ForbiddenException();
    return this.bookServer.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    console.log('params are', id);
    return `This action returns a #${id} book`;
  }
}
