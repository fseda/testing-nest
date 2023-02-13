import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException, ParseIntPipe, Query, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    // throw new HttpException('asdfa', HttpStatus.FORBIDDEN);

    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(
  ) {
    try {
      return await this.catsService.findAll()
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }

    // throw new BadRequestException('Something bad happened', { cause: new Error('Error 1'), description: 'Error description' });
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    // @Param('uuid', new ParseUUIDPipe({ version: '5' }))
  ) {
    try {
      return this.catsService.findOne(id);
    } catch (err) {
      throw new NotFoundException(`Cat with id ${id} was not found`, { cause: err, description: err.message });
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
