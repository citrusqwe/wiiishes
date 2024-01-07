import {Component, inject, Input} from '@angular/core';
import {FullWishItem, WishesApiService} from "../../services/wishes-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GiftsApiService} from "../../../gifts/services/gifts-api.service";
import {BehaviorSubject, finalize} from "rxjs";
import { TuiAlertService, TuiHostedDropdownModule, TuiDataListModule } from "@taiga-ui/core";
import { SkeletonDirective } from '../../../../shared/directives/skeleton/skeleton.directive';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { TuiDropdownModule } from '@taiga-ui/core/directives/dropdown';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-wishes-item',
    templateUrl: './wishes-item.component.html',
    styleUrls: ['./wishes-item.component.less'],
    standalone: true,
    imports: [NgIf, TuiBadgeModule, TuiHostedDropdownModule, TuiDropdownModule, TuiButtonModule, TuiDataListModule, TuiSvgModule, SkeletonDirective, AsyncPipe]
})
export class WishesItemComponent {
  private readonly wishesApiService: WishesApiService = inject(WishesApiService);
  private readonly giftsApiService: GiftsApiService = inject(GiftsApiService);
  private readonly alertService: TuiAlertService = inject(TuiAlertService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  @Input() wish: FullWishItem | null = null;
  @Input() uid: string | null = null;
  menuOpen: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  openPreview(): void {
    this.router.navigate([`${this.uid ? '../edit' : 'edit'}`, this.uid || null, this.wish?.id].filter(u => u), {relativeTo: this.route});
  }

  gift(): void {
    this.isLoading$.next(true);
    this.giftsApiService.markAsGift(this.wish as FullWishItem, this.uid as string).pipe(
      finalize(() => {
        this.isLoading$.next(false);
        this.menuOpen = false;
        this.alertService.open('successfully marked as gift 🥳🎁');
      }),
    ).subscribe();
  }

  deleteWish(): void {
    if (this.wish) {
      this.isLoading$.next(true);
      this.wishesApiService.deleteWish(this.wish.id).pipe(
        finalize(() => {
          this.isLoading$.next(false);
          this.menuOpen = false;
          this.alertService.open('successfully deleted🥺')
        })
      ).subscribe(data => console.log(data));
    }
  }
}
