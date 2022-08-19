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
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

// import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateBookDto } from './dto';
import { BookService } from './books.service';

@UseGuards(JwtAuthGuard)
@Controller('books')
// @UseFilters(new HttpExceptionFilter())
export class BooksController {
  constructor(private bookServer: BookService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: CreateBookDto,
  })
  create(@Body() createBookDto: CreateBookDto) {
    console.log('createBookDto', createBookDto);
    return this.bookServer.create(createBookDto);
  }

  @Get()
  async getAll(@Req() request: Request) {
    // console.log('request is', request);
    // throw new ForbiddenException();
    return this.bookServer.findAll(request.query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    console.log('params are', id);
    return `This action returns a #${id} book`;
  }
}
