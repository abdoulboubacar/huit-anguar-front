import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {GameService} from '../../services/game.service';
import {AuthService} from '../../services/auth.service';
import {Game} from '../../model/Game';
//import {LocalStorageService} from 'angular-2-local-storage';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'huit-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public singleModel:string = '1';

  constructor(private auth: AuthService, public fb: FormBuilder, private gameService: GameService) {

  }

  @Input()
  game: Game;

  public userForm = this.fb.group({
    name: ["", Validators.required],
  });

  ngOnInit() {
    if (localStorage.getItem('GameName') != null) {
      this.gameService.getGame().then(game => this.game = game as Game);
    }
  }

  profile() {
    if (localStorage.getItem('profile') != null) {
      return JSON.parse(localStorage.getItem('profile'));
    }
  }

  loadGame(event) {
    if (localStorage.getItem('GameName') != "") {
      this.gameService.createGame(localStorage.getItem('GameName')).then(game => this.game = game as Game);
    }
  }

  removePlayer(event) {
    if (this.userForm.value.name != "") {
      this.gameService.removePlayer(localStorage.getItem('GameName')).then(game => this.game = game as Game);
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
