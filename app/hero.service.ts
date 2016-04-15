import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 1000)
    );
  }

  getTopHeroes() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES.slice(0, 4)), 500)
    );
  }

  getHero(id: number) {
    return new Promise<Hero>(resolve =>
      setTimeout(() => resolve(HEROES.filter(hero => hero.id === id)[0]))
    );
  }
}
