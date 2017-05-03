import {Component, OnInit, Input, Output, EventEmitter, ViewChildren, ElementRef, QueryList} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {GameModel} from "../../models/game.model";

@Component({
  selector: 'app-channel-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {

  @Input() game: GameModel;
  @Output() closeDetail = new EventEmitter<boolean>();
  public users:Array<UserModel>;
  @ViewChildren('elem') elem: QueryList<ElementRef>;
  public clickedUser: UserModel;
  public showUserInfo: boolean;
  public position;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.game = data['game'];
      });
    this.showUserInfo = false;
    // this.getChannelUserList();
  }



  // getChannelUserList() {
  //   this.gamesService.getChannelUserList(this.game._id).subscribe(
  //     (success:Array<UserModel>) => {
  //       this.users = success;
  //     }
  //   );
  // }
  //
  // close() {
  //   this.closeDetail.emit(true);
  // }
  //
  // selectUser(user, index) {
  //   this.position = {
  //     top : this.elem.toArray()[index].nativeElement.offsetParent.offsetTop,
  //     left : this.elem.toArray()[index].nativeElement.offsetParent.offsetLeft
  //   };
  //   this.showUserInfo = !this.showUserInfo;
  //   this.clickedUser = user;
  // }


}
