import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameModel} from "../../models/game.model";
import {UserModel} from "../../models/user.model";
import {StorageService} from "../../services/storage/storage.service";
import {isNullOrUndefined} from "util";
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private game: GameModel;
  private user: UserModel;
  private showAddPlayerForm = false;
  private newPlayer = {
    name: ''
  };
  constructor(private route:ActivatedRoute, private storageService: StorageService, private gameService: GameService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.game = data['game'];
      }
    );

    if (!isNullOrUndefined(this.storageService.read("user"))) {
      this.user = this.storageService.read("user");
    } else {
      this.user = new UserModel();
    }
  }

  addPlayer() {
    this.gameService.addPlayer(this.game, this.newPlayer).subscribe(
      game => { this.game = game; this.showAddPlayerForm = false},
      error => {}
    );
  }
}
