import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { GameListComponent } from './views/game-list/game-list.component';
import {RouterModule} from "@angular/router";
import {GameService} from './services/game/game.service';
import { SearchPipe } from './pipes/search/search.pipe';
import { DateFilterPipe } from './pipes/date-filter/date-filter.pipe';
import { GameComponent } from './views/game/game.component';
import { LoginComponent } from './views/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {LoginService} from "./services/login/login.service";
import {StorageService} from "./services/storage/storage.service";
import {RegisterService} from "./services/register/register.service";
import {RegisterComponent} from "./views/register/register.component";
import {UsersService} from "./services/users/users.service";
import {HttpService} from "./services/http/http.service";
import {GameResolver} from "./resolvers/game.resoler";
import {PlayerComponent} from "./components/player/player.component";
import {PlayerService} from "./services/player/player.service";
import { RangePipe } from './pipes/range/range.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    SearchPipe,
    DateFilterPipe,
    GameComponent,
    LoginComponent,
    ToolbarComponent,
    RegisterComponent,
    PlayerComponent,
    RangePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{ provide: Http, useClass: HttpService }, GameResolver, GameService, LoginService, StorageService, RegisterService, UsersService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
