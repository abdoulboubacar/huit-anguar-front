import { Injectable } from '@angular/core';
import {StorageService} from "../storage/storage.service";
import {PlayerModel} from "../../models/player.model";

@Injectable()
export class PlayerService {

  constructor(private storageService: StorageService) { }

  preSaveScore(player: PlayerModel, score: number): void {
    let preSavedScores: Object = this.storageService.read('preSavedScores');
    if (preSavedScores == null) {
      preSavedScores = {};
    }
    preSavedScores[player.id] = {'id': player.id, 'score': score};
    this.storageService.save('preSavedScores', preSavedScores);
  }

  total(player: PlayerModel):Number {
    var res = 0;
    for (var i = 0; i < player.score.length; ++i) {
      res = res + player.score[i];
    }
    return res;
  }

}
