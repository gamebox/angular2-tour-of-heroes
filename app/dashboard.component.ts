import { Component, OnInit } from 'angular2/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from 'angular2/router'

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes: Hero[];

  constructor(private _heroService: HeroService, private _router: Router) {

  }

  ngOnInit() {
    this._heroService.getTopHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
