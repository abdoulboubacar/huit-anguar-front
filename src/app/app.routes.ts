import { Routes } from '@angular/router';
import {GameListComponent} from './views/game-list/game-list.component';
import {GameComponent} from "./views/game/game.component";
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {GameResolver} from "./resolvers/game.resoler";

export const ROUTES: Routes = [
  { path: '', component: GameListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game/:id', component: GameComponent, resolve : {game: GameResolver}},
];
