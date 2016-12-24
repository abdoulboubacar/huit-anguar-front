import {Player} from '../model/Player';
import 'rxjs/add/operator/toPromise';
import {LocalStorageService} from 'angular-2-local-storage';
import {Injectable} from '@angular/core';

@Injectable()
export class PlayerService {

  constructor(private localStorageService: LocalStorageService) {
  }

  preSaveScore(player: Player, score): void {
    let preSavedScores: Object = this.localStorageService.get('preSavedScores');
    if (preSavedScores == null) {
      preSavedScores = {};
    }
    preSavedScores[player.id] = {'name': player.name, 'score': score.trim()};
    this.localStorageService.set('preSavedScores', preSavedScores);
  }

  total(player: Player):Number {
    var res = 0;
    for (var i = 0; i < player.score.length; ++i) {
      res = res + player.score[i];
    }
    return res;
  }
}
