import { IAnimal } from './interfaces/animal.interface';
import { AnimalTypeEnum } from './enums/animalType.enum';

export class Dogacat implements IAnimal {
  public type: AnimalTypeEnum = AnimalTypeEnum.DOGACAT;
  constructor(public title: string, public hasChildren?: boolean, public isExist?: boolean, public strength?: number) {}
}
