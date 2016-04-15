import {Component, OnInit} from 'angular2/core';
import {HeroDetailComponent} from './hero-detail.component';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  title: string;
  selectedHero: Hero;
  public heroes: Hero[];

  constructor(private _heroService: HeroService, private _router: Router) {
    this.title = 'Tour of Heroes';
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this._heroService
        .getHeroes()
        .subscribe(heroes => this.heroes = heroes,
                   error  => { throw new Error(error); });
  }

  onHeroClick(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }

  addHero(name: string) {
    this._heroService.addHero(name)
                     .subscribe(hero => this.heroes.push(hero),
                                error => { throw new Error(error); });
  }
}
