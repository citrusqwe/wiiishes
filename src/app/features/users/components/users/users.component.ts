import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService, UserData} from "../../../../shared/services/auth/auth.service";
import {UserPreviewComponent} from '../../../../shared/components/user-preview/user-preview.component';
import {NgFor, AsyncPipe} from '@angular/common';
import {TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';
import {TuiLetModule} from '@taiga-ui/cdk';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  standalone: true,
  imports: [TuiLetModule, TuiInputModule, FormsModule, TuiPrimitiveTextfieldModule, NgFor, UserPreviewComponent, AsyncPipe]
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
