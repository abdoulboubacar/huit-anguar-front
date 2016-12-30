import {Injectable} from '@angular/core';
import {Game} from '../model/Game';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameService {
  private gameUrl = '/api/game';  // base URL to web api
  private game;

  constructor(private http: Http) {
  }

  getGame(): Promise<Game> {
    const gameName = localStorage.getItem('GameName');
    const url = `${this.gameUrl}/${gameName}`;
    return this.post(url, '');
  }

  createGame(name: string): Promise<Game> {
    localStorage.removeItem('preSavedScores');
    localStorage.setItem('GameName', name);

    return this.getGame();
  }

  removePlayer(playerName): Promise<Game> {
    const gameName = localStorage.getItem('GameName');
    const url = `${this.gameUrl}/${gameName}/player/remove/${playerName}`;
    localStorage.removeItem('preSavedScores');
    return this.delete(url);
  }

  createPlayer(playerName): Promise<Game> {
    const gameName = localStorage.getItem('GameName');
    const url = `${this.gameUrl}/${gameName}/player/add/${playerName}`;
    localStorage.removeItem('preSavedScores');
    return this.put(url, '');
  }

  removeLast(): Promise<Game> {
    const gameName = localStorage.getItem('GameName');
    const url = `${this.gameUrl}/${gameName}/removelast`
    return this.patch(url, '');
  }

  saveScores(): Promise<Game>[] {
    let preSavedScores = JSON.parse(localStorage.getItem('preSavedScores')) as Object;
    let gameName = localStorage.getItem('GameName');
    let promises = [];
    let i = 0;
    for (var key in preSavedScores) {
      if (!preSavedScores.hasOwnProperty(key)) continue;
      var obj = preSavedScores[key];
      promises[i++] = this.addPlayerScore(gameName, obj.name, obj.score);
    }

    localStorage.removeItem('preSavedScores');
    return promises;
  }

  playAgain(): Promise<Game> {
    const gameName = localStorage.getItem('GameName');
    const url = `${this.gameUrl}/${gameName}/playagain`
    return this.post(url, '');
  }

  private addPlayerScore(gameName, playerName, score): Promise<Game> {
    const url = `${this.gameUrl}/${gameName}/player/updatescore/${playerName}/${score}`
    return this.patch(url, '');
  }

  addPlayerSuperScore(gameName, playerName, superscore): Promise<Game> {
    const url = `${this.gameUrl}/${gameName}/player/updatesuperscore/${playerName}/${superscore}`
    return this.patch(url, '');
  }

  private get(url): Promise<Game> {
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json() as Game)
      .catch(this.handleError);
  }

  private put(url, data): Promise<Game> {
    return this.http
      .put(url, data)
      .toPromise()
      .then(res => res.json() as Game)
      .catch(this.handleError);
  }

  private patch(url, data): Promise<Game> {
    return this.http
      .patch(url, data)
      .toPromise()
      .then(res => res.json() as Game)
      .catch(this.handleError);
  }

  private delete(url): Promise<Game> {
    return this.http
      .delete(url)
      .toPromise()
      .then(res => res.json() as Game)
      .catch(this.handleError);
  }

  private post(url, data): Promise<Game> {
    return this.http
      .post(url, data)
      .toPromise()
      .then(res => res.json() as Game)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
