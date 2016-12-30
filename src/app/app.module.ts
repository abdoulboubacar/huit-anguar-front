import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import {PlayerComponent} from './components/player/player.component';
import {GameComponent} from './components/game/game.component';
import {LocalStorageModule} from 'angular-2-local-storage';
import { RangePipe } from './pipes/range.pipe';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    PlayerComponent,
    GameComponent,
    RangePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'huit-game',
      storageType: 'localStorage'
    })
  ],
  providers: [GameService, PlayerService, AuthService, AUTH_PROVIDERS],
  bootstrap: [GameComponent]
})
export class AppModule {
}

