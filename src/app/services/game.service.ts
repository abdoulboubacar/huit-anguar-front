import {Injectable} from '@angular/core';
import {Game} from '../model/Game';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class GameService {
  private gameUrl = 'http://localhost:9000/api/game';  // base URL to web api
  private game;

  constructor(private http: Http, private localStorageService: LocalStorageService) {
  }

  getGame(): Promise<Game> {
    const gameName = this.localStorageService.get('GameName');
    const url = `${this.gameUrl}/${gameName}`;
    return this.post(url, '');
  }

  createGame(name: String): Promise<Game> {
    this.localStorageService.clearAll();
    this.localStorageService.set('GameName', name);

    return this.getGame();
  }

  removePlayer(playerName): Promise<Game> {
    const gameName = this.localStorageService.get('GameName');
    const url = `${this.gameUrl}/${gameName}/player/remove/${playerName}`;
    this.localStorageService.remove('preSavedScores');
    return this.post(url, '');
  }

  createPlayer(playerName): Promise<Game> {
    const gameName = this.localStorageService.get('GameName');
    const url = `${this.gameUrl}/${gameName}/player/add/${playerName}`;
    this.localStorageService.remove('preSavedScores');
    return this.post(url, '');
  }

  removeLast(): Promise<Game> {
    const gameName = this.localStorageService.get('GameName');
    const url = `${this.gameUrl}/${gameName}/removelast`
    return this.post(url, '');
  }

  saveScores(): Promise<Game>[] {
    let preSavedScores = this.localStorageService.get('preSavedScores');
    let gameName = this.localStorageService.get('GameName');
    let promises = [];
    let i = 0;
    for (var key in preSavedScores) {
      if (!preSavedScores.hasOwnProperty(key)) continue;
      var obj = preSavedScores[key];
      promises[i++] = this.addPlayerScore(gameName, obj.name, obj.score);
    }

    this.localStorageService.remove('preSavedScores');
    return promises;
  }

  playAgain(): Promise<Game> {
    const gameName = this.localStorageService.get('GameName');
    const url = `${this.gameUrl}/${gameName}/playagain`
    return this.post(url, '');
  }

  private addPlayerScore(gameName, playerName, score): Promise<Game> {
    const url = `${this.gameUrl}/${gameName}/player/updatescore/${playerName}/${score}`
    return this.post(url, '');
  }

  addPlayerSuperScore(gameName, playerName, superscore): Promise<Game> {
    const url = `${this.gameUrl}/${gameName}/player/updatesuperscore/${playerName}/${superscore}`
    return this.post(url, '');
  }

  private get(url): Promise<Game> {
    return this.http
      .get(url)
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
