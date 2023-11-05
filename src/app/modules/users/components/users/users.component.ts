import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService, UserData} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);

  users$: Observable<UserData[]> | null = null;
  readonly skeletonsArray = new Array(10).map(() => null);

  searchUser: string = '';

  usersTrackBy(_: number, gift: UserData): string {
    return gift.id;
  }

  getUsers(): void {
    this.users$ = this.authService.getAllOtherUsers();
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
