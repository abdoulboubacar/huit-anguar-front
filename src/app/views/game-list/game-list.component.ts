import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game/game.service";
import {GameModel} from "../../models/game.model";
import {error} from "util";
import {StorageService} from "../../services/storage/storage.service";
import {isNullOrUndefined} from "util";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  public games: Array<GameModel> = [];
  public enableSearch = false;
  public title = 'Liste de jeux';
  public search = '';
  public showNewGameForm = false;
  public newGame: GameModel = new GameModel();
  public user: UserModel;

  constructor(private gameService: GameService, private storageService: StorageService) { }

  ngOnInit() {
    this.getGames();
    if (!isNullOrUndefined(this.storageService.read("user"))) {
      this.user = this.storageService.read("user");
    } else {
      this.user = new UserModel();
    }
  }

  getGames() {
    this.gameService.getGames().subscribe(
      games => {this.games = games;},
      error => {console.error(error);}
    );
  }

  addGame() {
    this.gameService.addGame(this.newGame).subscribe(
      game => {
        this.games = this.games.concat(game);
        this.showNewGameForm = false;
        this.newGame = new GameModel(); //navigate to game
      },
      error => {this.showNewGameForm = false; console.error(error);}
    );
  }

}
