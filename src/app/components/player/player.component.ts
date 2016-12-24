import {Component, Input} from '@angular/core';
import {Player} from '../../model/Player';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
// import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent {

  constructor(public fb: FormBuilder, private playerService: PlayerService) {
  }

  public playerForm = this.fb.group({
    score: ["", Validators.required],
    playerId: ["", Validators.required]
  });

  @Input()
  player: Player;

  preSubmit(event) {
    this.playerService.preSaveScore(this.player, event);
  }
}
