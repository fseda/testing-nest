import { HttpExceptionFilter } from './../common/filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './dto/create-user.dto';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, HttpStatus, NotFoundException, UsePipes, UseFilters, BadRequestException, HttpException } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() UserData: CreateUserDto) {
    try {
      return await this.usersService.create(UserData);
    } catch (err) {
      throw new BadRequestException(err.message, { cause: err, description: err.meta });
    }
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
    try {
      return await this.usersService.findOne({ id: Number(id) });
    } catch (err) {
      throw new NotFoundException(`User with id ${id} was not found`, { cause: err, description: err.message });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userData: { name, email }) {
    const { name, email } = userData;

    try {
      return await this.usersService.update({ where: { id: Number(id) }, data: { name, email }});
    } catch (err) {
      throw new NotFoundException(`User with id ${id} was not found`, { cause: err, description: err.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove({ where: { id: Number(id) } });
  }
}
