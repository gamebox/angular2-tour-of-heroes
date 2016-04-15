import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class HeroService {
  constructor (private http: Http) {}

  private _heroesUrl = 'app/heroes.json';  // URL to web api

  getHeroes (): Observable<Hero[]> {
    console.log("Service getHeroes called");
    return this.http.get(this._heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    console.log(res);
    console.log(body);
    console.log("About to return", body || []);
    return body || [];
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  getTopHeroes() {
    return this.getHeroes().map(heroes => heroes.slice(0,4));
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes()
        .map(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
}
