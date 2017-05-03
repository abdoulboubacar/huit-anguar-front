import {Component, OnInit, Input} from '@angular/core';
import {PlayerModel} from "../../models/player.model";
import {PlayerService} from "../../services/player/player.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input()
  player: PlayerModel;

  constructor(private fb: FormBuilder, private playerService: PlayerService) { }

  ngOnInit() {
  }

  public playerForm = this.fb.group({
    score: ["", Validators.required],
    playerId: ["", Validators.required]
  });

  preSubmit(event) {
    this.playerService.preSaveScore(this.player, event);
  }

}
