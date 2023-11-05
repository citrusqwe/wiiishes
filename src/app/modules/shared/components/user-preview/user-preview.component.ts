import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.less']
})
export class UserPreviewComponent implements OnInit {
  @Input({required: true}) user: UserData | null = null;
  @Input() isOtherUser: boolean = false;

  link: string = '';

  ngOnInit(): void {
    this.link = this.isOtherUser ? `/wishes/${this.user?.authUid}` : '';
  }
}
