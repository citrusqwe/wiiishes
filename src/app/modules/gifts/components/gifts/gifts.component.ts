import {Component, inject, OnInit} from '@angular/core';
import {GiftItem, GiftsApiService} from "../../services/gifts-api.service";
import {map, Observable} from "rxjs";
import {UserData} from "../../../../services/auth/auth.service";

interface GiftListItem {
  id: string;
  user: UserData;
  data: GiftItem[];
}

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.less']
})
export class GiftsComponent implements OnInit {
  private readonly giftsApiService: GiftsApiService = inject(GiftsApiService);

  gifts$: Observable<GiftListItem[]> | null = null;
  readonly skeletonsArray = new Array(6).map(() => null);

  giftsTrackBy(_: number, gift: GiftListItem): string {
    return gift.id;
  }

  giftItemsTrackBy(_: number, gift: GiftItem): string {
    return gift.id;
  }

  getGifts(): void {
    this.gifts$ = this.giftsApiService.getGifts().pipe(
      map(data => {
        const giftsByUsers: GiftListItem[] = [];
        data.forEach(item => {
          const foundIndex = giftsByUsers.findIndex(newItem => newItem.id === item.id);
          if (!!foundIndex) {
            giftsByUsers.push({
              id: item.id,
              user: item.user as UserData,
              data: [item],
            });
          } else {
            const userGifts = giftsByUsers[foundIndex];
            userGifts.data = [...userGifts.data, item];
          }
        });
        return giftsByUsers;
      }),
    );
  }

  ngOnInit(): void {
    this.getGifts();
  }
}
