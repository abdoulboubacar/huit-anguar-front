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
  providers: [GameService, PlayerService],
  bootstrap: [GameComponent]
})
export class AppModule {
}

