import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../services/auth/auth.service";
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { NgIf } from '@angular/common';
import { SkeletonDirective } from '../../directives/skeleton/skeleton.directive';
import { RouterLink } from '@angular/router';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
    selector: 'app-user-preview',
    templateUrl: './user-preview.component.html',
    styleUrls: ['./user-preview.component.less'],
    standalone: true,
    imports: [TuiAvatarModule, RouterLink, SkeletonDirective, NgIf, TuiButtonModule]
})
export class UserPreviewComponent implements OnInit {
  @Input({required: true}) user: UserData | null = null;
  @Input() isOtherUser: boolean = false;

  link: string = '';

  ngOnInit(): void {
    this.link = this.isOtherUser ? `/wishes/${this.user?.authUid}` : '';
  }
}
