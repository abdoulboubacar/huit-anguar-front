import {PlayerModel} from "./player.model";
import {UserModel} from "./user.model";
export class GameModel {
  id: number;
  players: Array<PlayerModel>;
  name: string;
  date: Date;
  owner: UserModel;
  max_first_game: number = 50;
  max_game: number = 101;
  bonus: number = 10;
}
