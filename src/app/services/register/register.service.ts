import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../Config';
@Injectable()
export class RegisterService {
  constructor(private http: Http) { }
  register(newUser) {
    return this.http.put(Config.apiUrl + '/register', newUser)
      .map(res => res.json());
  }
}
