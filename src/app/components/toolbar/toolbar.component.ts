import {Component, OnInit, Input} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {StorageService} from "../../services/storage/storage.service";
import {isNullOrUndefined} from "util";
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private user: UserModel;

  constructor(private storageService:StorageService, private usersService: UsersService) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.storageService.read("user"))) {
      this.user = this.storageService.read("user");
    } else {
      this.user = new UserModel();
    }
  }

}
