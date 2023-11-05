import {inject, Injectable} from '@angular/core';
import {defer, from, Observable, switchMap} from "rxjs";
import {
  addDoc,
  collection, deleteDoc, doc, DocumentReference,
  Firestore, getDoc, getDocs, query, updateDoc, where,
} from "@angular/fire/firestore";
import {Rating} from "../components/wishes/wishes.component";
import {QuerySnapshot, CollectionReference} from "@angular/fire/firestore";
import {SharedService} from "../../../services/shared/shared.service";
import {AuthService} from "../../../services/auth/auth.service";

export type FullWishItem = {
  id: string;
  title: string;
  description: string;
  rating: Rating;
  image: string | null;
  userId: string;
  markedAsGift: boolean;
};

export type WishItem = Omit<FullWishItem, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class WishesApiService {
  private firestore: Firestore = inject(Firestore);
  private sharedService: SharedService = inject(SharedService);
  private authService: AuthService = inject(AuthService);

  private wishesCollection: CollectionReference = collection(this.firestore, 'wishes');

  getWishes(userId?: string): Observable<QuerySnapshot<WishItem>> {
    const q = userId ? query(this.wishesCollection, where("userId", "==", userId)) : this.wishesCollection;

    return this.sharedService.attachCatchError(
      defer(() => from(getDocs(q)))
    );
  }

  getMyWishes(): Observable<QuerySnapshot<WishItem>> {
    return this.sharedService.attachCatchError(
      this.authService.authUser$.pipe(
        switchMap(user => this.getWishes(user?.uid)),
      )
    );
  }

  getUserWishes(uid: string): Observable<QuerySnapshot<WishItem>> {
    return this.getWishes(uid);
  }

  getById(id: string): Observable<FullWishItem> {
    return this.sharedService.attachCatchError(
      defer(() => from(
        getDoc(doc(this.firestore, 'wishes', id)).then(snap => ({...snap.data(), id: snap.id}))
      ))
    );
  }

  loadImage(file: File): Observable<string | null> {
    return this.sharedService.loadImage(file);
  }

  makeWish(data: WishItem): Observable<DocumentReference<FullWishItem>> {
    return this.sharedService.attachCatchError(
      defer(() => from(addDoc(this.wishesCollection, data)))
    );
  }

  editWish(data: FullWishItem): Observable<DocumentReference<FullWishItem>> {
    return this.sharedService.attachCatchError(
      defer(() => from(
        updateDoc(doc(this.firestore, 'wishes', data.id), data)
      ))
    );
  }

  deleteWish(wishId: string): Observable<any> {
    return this.sharedService.attachCatchError(
      defer(() => from(
        deleteDoc(doc(this.firestore, 'wishes', wishId))
      ))
    );
  }
}
