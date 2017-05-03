import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login/login.service";
import {StorageService} from "../../services/storage/storage.service";
import {UserModel} from "../../models/user.model";
import {isSuccess} from "@angular/http/src/http_utils";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: UserModel;

  credentials = {
    email: '',
    password: ''
  };
  authenticationFailed = false;

  constructor(private loginService: LoginService,
              private router: Router, private storageService: StorageService) {
  }

  ngOnInit() {
    this.loginService.logout().subscribe(
      success => {
        console.log(success);
        this.storageService.clear();
      },
      error => {}
    );

  }

  login() {
    this.loginService.login(this.credentials).subscribe(
      success => {
        this.user = success;
        this.authenticationFailed = false;
        this.storageService.save('user', success);
        this.router.navigate(['']);
      },
      error => {
        console.error(JSON.stringify(error));
        this.authenticationFailed = true;
      }
    );
  }
}
