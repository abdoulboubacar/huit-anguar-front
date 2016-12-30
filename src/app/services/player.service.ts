import {Player} from '../model/Player';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';

@Injectable()
export class PlayerService {

  constructor() {
  }

  preSaveScore(player: Player, score): void {
    let preSavedScores: Object = JSON.parse(localStorage.getItem('preSavedScores'));
    if (preSavedScores == null) {
      preSavedScores = {};
    }
    preSavedScores[player.id] = {'name': player.name, 'score': score.trim()};
    localStorage.setItem('preSavedScores', JSON.stringify(preSavedScores));
  }

  total(player: Player):Number {
    var res = 0;
    for (var i = 0; i < player.score.length; ++i) {
      res = res + player.score[i];
    }
    return res;
  }
}
