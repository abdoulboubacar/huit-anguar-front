import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {GameModel} from "../../models/game.model";
import {Config} from "../../Config";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

  constructor(private http:Http) { }

  getGames(): Observable<Array<GameModel>> {
    return this.http.get(`${Config.apiUrl}/games`).map(res => res.json());
  }

  addGame(game): Observable<GameModel> {
    return this.http.put(`${Config.apiUrl}/game/create`, game).map(res => res.json());
  }

  getGame(id:number): Observable<GameModel> {
    return this.http.get(`${Config.apiUrl}/game/${id}`).map(res => res.json());
  }

  addPlayer(game: GameModel, player: any): Observable<GameModel> {
    return this.http.put(`${Config.apiUrl}/game/${game.id}/player/add`, player).map(res => res.json());
  }
}
