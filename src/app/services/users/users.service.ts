import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "../../Config";
import {Observable} from "rxjs";
import {UserModel} from "../../models/user.model";

@Injectable()
export class UsersService {

  constructor(private http:Http) { }

  getUser(id:string): Observable<UserModel> {
    return this.http.get(Config.apiUrl + '/users/' + id)
      .map(res => res.json());
  }

}
