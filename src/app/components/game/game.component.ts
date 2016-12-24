import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {Game} from '../../model/Game';
import {LocalStorageService} from 'angular-2-local-storage';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'huit-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public singleModel:string = '1';
  
  constructor(public fb: FormBuilder, private gameService: GameService, private localStorageService: LocalStorageService) {
  }

  @Input()
  game: Game;

  public gameForm = this.fb.group({
    name: ["", Validators.required],
  });

  public userForm = this.fb.group({
    name: ["", Validators.required],
  });

  ngOnInit() {
    if (this.localStorageService.get('GameName') != null) {
      this.gameService.getGame().then(game => this.game = game as Game);
      this.gameForm.controls['name'].setValue(this.localStorageService.get('GameName'));
    }
  }

  loadGame(event) {
    if (this.gameForm.value.name != "") {
      this.gameService.createGame(this.gameForm.value.name).then(game => this.game = game as Game);
    }
  }

  removePlayer(event) {
    if (this.userForm.value.name != "") {
      this.gameService.removePlayer(this.userForm.value.name).then(game => this.game = game as Game);
    }
  }

  newPlayer(event) {
    if (this.userForm.value.name != "") {
      this.gameService.createPlayer(this.userForm.value.name).then(game => this.game = game as Game);
    }
  }

  saveScores(event) {
    Promise.all(this.gameService.saveScores()).then(value => this.gameService.getGame().then(game => this.game = game as Game));
  }

  removeLast(event) {
    this.gameService.removeLast().then(game => this.game = game as Game);
  }

  playAgain(event) {
    this.gameService.playAgain().then(game => this.game = game as Game);
  }

}
