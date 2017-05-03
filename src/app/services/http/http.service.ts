import { Injectable } from '@angular/core';
import {
  Http, Request, RequestOptionsArgs, Response, ConnectionBackend, RequestOptions,
  XHRBackend, Headers
} from "@angular/http";
import {Observable} from "rxjs";
import {StorageService} from "../storage/storage.service";
import {UserModel} from "../../models/user.model";

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions, private storageService: StorageService) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let user: UserModel = this.storageService.read("user");

    if (user !== null) {
      if (typeof url === 'string') {
        if (!options) {
          // let's make option object
          options = {headers: new Headers()};
        }
        options.headers.set('Authorization', `Bearer ${user.authToken}`);
      } else {
        // we have to add the token to the url object
        url.headers.set('Authorization', `Bearer ${user.authToken}`);
      }
    }

    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401 || error.status === 403) {
        console.log('The authentication session expires or the user is not authorised.');
        this.storageService.remove("user");
      }
      return Observable.throw(error);
    });
  }
}
