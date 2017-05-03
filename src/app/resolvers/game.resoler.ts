import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {GameModel} from "../models/game.model";
import {GameService} from "../services/game/game.service";
@Injectable()
export class GameResolver implements Resolve<GameModel> {
  constructor(private gameService: GameService) {
  }

  resolve(route: ActivatedRouteSnapshot) : Observable<GameModel> {
    let gameId = route.params['id'];

    return this.gameService.getGame(gameId);
  }
}
