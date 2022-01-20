import { IAnimal } from './interfaces/animal.interface';
import { AnimalTypeEnum } from './enums/animalType.enum';

export class Dog implements IAnimal {
  public type: AnimalTypeEnum = AnimalTypeEnum.DOG;
  constructor(public title: string, public isFight?: boolean, public age?: number, public owner?: string) {}
}
