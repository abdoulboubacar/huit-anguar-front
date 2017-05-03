import {GameModel} from "./game.model";
import {isNullOrUndefined} from "util";
export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  games: Array<GameModel>;
  authToken: string;

  isAnonymous():boolean {
    return isNullOrUndefined(this.authToken);
  }
}
