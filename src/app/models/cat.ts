import { IAnimal } from './interfaces/animal.interface';
import { AnimalTypeEnum } from './enums/animalType.enum';

export class Cat implements IAnimal {
  public type: AnimalTypeEnum = AnimalTypeEnum.CAT;
  constructor(public title: string) {}
}
