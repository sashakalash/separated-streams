import { IAnimalList } from './models/interfaces/animalList.interface';
import { Dog } from './models/dog';
import { IAnimal } from './models/interfaces/animal.interface';
import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { Cat } from './models/cat';
import { Dogacat } from './models/dogacat';
import { AnimalTypeEnum } from './models/enums/animalType.enum';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function fillList(type: AnimalTypeEnum, limit: number): IAnimalList<IAnimal> {
  const res: IAnimalList<IAnimal> = { type, items: [] };
  for (let i = 1; i <= limit; i++) {
    res.items.push({ type, title: `${type}-${randomInt(0, limit)}`})
  }
  return res;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly MIN_LIMIT = 1;
  private readonly MAX_LIMIT = 10;

  private catList: Subject<IAnimalList<Cat>> = new Subject<IAnimalList<Cat>>();
  private dogList: Subject<IAnimalList<Dog>> = new Subject<IAnimalList<Dog>>();
  private dogacatList: Subject<IAnimalList<Dogacat>> = new Subject<IAnimalList<Dogacat>>();

  private catListStream$: Observable<IAnimalList<Cat>> = this.catList.asObservable();
  private dogListStream$: Observable<IAnimalList<Dog>> = this.dogList.asObservable();
  private dogacatListStream$: Observable<IAnimalList<Dogacat>> = this.dogacatList.asObservable();
  public animalStream$!: Observable<IAnimalList<IAnimal>>;

  public readonly ANIMAL_TYPES = AnimalTypeEnum;

  ngOnInit(): void {
    setInterval(() => {
      const random = randomInt(this.MIN_LIMIT, this.MAX_LIMIT);
      let animalList: IAnimalList<IAnimal>;
      switch (true) {
        case random <= 3:
          animalList = fillList(AnimalTypeEnum.CAT, random);
          this.catList.next(animalList);
          break;
        case random > 3 && random <= 6:
          animalList = fillList(AnimalTypeEnum.DOG, random);
          this.dogList.next(animalList);
          break;
        default:
          animalList = fillList(AnimalTypeEnum.DOGACAT, random);
          this.dogacatList.next(animalList);
          break;
      }
    }, 1000);

    this.animalStream$ = merge(
      this.catListStream$,
      this.dogListStream$,
      this.dogacatListStream$
    );
  }
}
