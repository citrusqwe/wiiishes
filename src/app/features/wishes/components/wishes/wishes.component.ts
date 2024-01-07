import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {map, Observable, takeUntil, tap} from "rxjs";
import {FullWishItem, WishesApiService} from "../../services/wishes-api.service";
import {ActivatedRoute} from "@angular/router";
import { TuiDestroyService, TuiForModule } from "@taiga-ui/cdk";
import { WishesItemComponent } from '../wishes-item/wishes-item.component';
import { NgFor, NgStyle, AsyncPipe } from '@angular/common';
import { WishesHeaderComponent } from '../wishes-header/wishes-header.component';

export class Rating {
  constructor(readonly label: string, readonly value: 0 | 1 | 2) {
  }
}

@Component({
    selector: 'app-wishes',
    templateUrl: './wishes.component.html',
    styleUrls: ['./wishes.component.less'],
    providers: [TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [WishesHeaderComponent, NgFor, TuiForModule, WishesItemComponent, NgStyle, AsyncPipe]
})
export class WishesComponent implements OnInit {
  private readonly wishesApiService: WishesApiService = inject(WishesApiService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroy$: TuiDestroyService = inject(TuiDestroyService);

  wishes$: Observable<FullWishItem[]> | null = null;
  skeletonsArray: null[] = new Array(20).fill(null).map(item => item);
  uid: string | null = null;

  getWishes(uid: string | null): void {
    const request = uid ? this.wishesApiService.getUserWishes(uid) : this.wishesApiService.getMyWishes();
    this.wishes$ = request.pipe(
      map((data) => data.docs.map((item) => ({...item.data(), id: item.id})))
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => params['uid'] ? params['uid'] : null),
      tap(uid => {
        this.uid = uid;
        this.getWishes(uid);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
