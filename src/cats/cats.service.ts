import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity'

import * as _ from 'lodash';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      name: 'Pomarola',
      age: 1,
      breed: 'stray'
    },
    {
      id: 2,
      name: 'Martin',
      age: 3,
      breed: 'stray'
    },
    {
      id: 3,
      name: 'Felix',
      age: 10,
      breed: 'stray'
    },
  ]

  create(createCatDto: CreateCatDto) {
    const cat = {id: this.getLastId() + 1, ... _.cloneDeep(createCatDto)}

    this.cats.push(cat);

    return this.cats.slice(-1);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number) {
    // let cat: Cat;
    for (const cat of this.cats) {
      if (cat.id === id) {
        return cat
      }
    }

    // return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    for (const cat of this.cats) {
      if (cat.id === id) {
        this.cats.splice(cat.id - 1, 1);
        return cat;
      }
    }
  }

  private getLastId() {
    if (this.cats.length === 0) {
      return 0
    }

    const lastElement = this.cats.slice(-1)[0]
    const lastId = lastElement.id
    return lastId
  }
}
