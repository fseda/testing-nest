import { CreateCatDto } from '../dto/create-cat.dto';

export class Cat extends CreateCatDto {
  id: number;

  constructor() {
    super();
  }
}
