import {Component, Input, OnInit} from 'angular2/core';
import {Hero} from './hero';
import { RouteParams } from 'angular2/router';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  template: `
  <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div>
      <label>id: </label>{{hero.id}}
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name"
             type="text"
             placeholder="Name">
    </div>
  </div>
  <div *ngIf="!hero">
    <h2>Select a Hero!</h2>
  </div>
  <button (click)="goBack()">Go back</button>
  `,
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private _heroService: HeroService, private _routeParams: RouteParams) {

  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id).subscribe(hero => this.hero = hero,
                                            error => { throw new Error(error); });
  }

  goBack() {
    window.history.back();
  }
}
