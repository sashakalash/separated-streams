import { AnimalTypeEnum } from '../enums/animalType.enum';

export interface IAnimalList<T> {
  type: AnimalTypeEnum,
  items: T[]
}
