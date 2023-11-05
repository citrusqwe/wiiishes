import {inject, Injectable} from '@angular/core';
import {defer, finalize, from, map, mergeMap, Observable, switchMap, take, tap} from "rxjs";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentReference,
  Firestore, getDocs, query, where,
} from "@angular/fire/firestore";
import {AuthService, UserData} from "../../../services/auth/auth.service";
import {FullWishItem} from "../../wishes/services/wishes-api.service";
import {SharedService} from "../../../services/shared/shared.service";

export interface GiftItem extends FullWishItem {
  user: UserData | null;
}

@Injectable({
  providedIn: 'root'
})
export class GiftsApiService {
  private firestore: Firestore = inject(Firestore);
  private readonly authService: AuthService = inject(AuthService);
  private readonly sharedService: SharedService = inject(SharedService);

  private giftsCollection: CollectionReference = collection(this.firestore, 'gifts');

  constructor() {
  }

  // TODO: Помечать виш как подарок, добавлять markedAsGift: true + gifterId: "id" или лучше даже user;

  markAsGift(wish: FullWishItem, uid: string): Observable<DocumentReference> {
    return defer(() => this.authService.authUser$.pipe(
        map((user) => ({giftUserId: user?.uid, ...wish})),
        take(1),
        mergeMap((gift) => this.authService.getUser(uid).pipe(
          map((user) => ({user, ...gift, markedAsGift: true}))
        )),
        switchMap((gift: GiftItem) => from(addDoc(this.giftsCollection, gift))),
        this.sharedService.catchErrorAndAlert(),
      )
    );
  }

  getGifts(): Observable<GiftItem[]> {
    return defer(() => this.authService.authUser$.pipe(
        switchMap(user => from(getDocs(query(this.giftsCollection, where("giftUserId", "==", user?.uid)))).pipe(
            map(data => data.docs.map(doc => ({id: doc.id, ...doc.data()}) as GiftItem)),
          )
        ),
        take(1),
        this.sharedService.catchErrorAndAlert(),
      )
    );
  }
}
