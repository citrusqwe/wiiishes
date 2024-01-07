import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, defer, from, map, Observable, switchMap, take} from "rxjs";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider, onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, signOut, User, user,
} from "@angular/fire/auth";
import {SharedService} from "../shared/shared.service";
import {
  addDoc,
  collection,
  DocumentReference,
  Firestore,
  query,
  where,
  getDocs, getDoc,
} from "@angular/fire/firestore";
import {TuiDay} from "@taiga-ui/cdk";

export interface UserCreate {
  image: string | null;
  email: string;
  username: string;
  password?: string;
  birthday: Date;
}

export interface UserForm {
  image: File;
  email: string;
  username: string;
  password: string;
  birthday: TuiDay;
  confirmPassword?: string;
}

export interface UserData extends UserCreate {
  id: string;
  role: string;
  authUid: string;
}

export interface UserFromFirebase extends User {
  accessToken: string;
}

export interface UserFormData extends Omit<UserCreate, "image"> {
  image: File;
}

export type UserLogin = Pick<UserCreate, "email" | "password">;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sharedService: SharedService = inject(SharedService);

  // firebase
  private auth: Auth = inject(Auth);
  private googleAuthProvider = new GoogleAuthProvider();
  private firestore: Firestore = inject(Firestore);
  private usersCollection = collection(this.firestore, 'users');

  private readonly DEFAULT_ROLE: string = 'user';
  readonly userSub$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  get user$(): Observable<UserData | null> {
    return this.userSub$.asObservable();
  }

  get authUser$(): Observable<User | null> {
    return user(this.auth);
  }

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      const userCredential = user as UserFromFirebase;
      const userData: UserData | null = await this.getUserFromStorage(userCredential?.uid) as UserData;
      this.userSub$.next(userData);
    });
  }

  async getUserFromStorage(uid?: string): Promise<UserData | null> {
    if (!uid) return null;

    const q = query(this.usersCollection, where("authUid", "==", uid));
    const userFromStorage = await getDocs(q);
    return userFromStorage.docs.at(0)?.data() as UserData || null;
  }

  getUser(uid?: string): Observable<UserData | null> {
    return defer(() =>
      from(this.getUserFromStorage(uid)).pipe(
        this.sharedService.catchErrorAndAlert(),
      ));
  }

  getAllOtherUsers(): Observable<UserData[]> {
    return defer(() => this.authUser$.pipe(
      switchMap((user) => from(getDocs(query(this.usersCollection, where("authUid", "!=", user?.uid)))).pipe(
        map(users => users.docs.map(user => ({id: user.id, ...user.data()}) as UserData))
      )),
      take(1),
      this.sharedService.catchErrorAndAlert(),
    ));
  }

  loadImage(image: File): Observable<string | null> {
    return this.sharedService.loadImage(image);
  }

  signup(user: UserCreate): Observable<UserData | null> {
    return defer(() => from(
      new Promise<UserData | null>((resolve, reject) => {
        (async () => {
          try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.password as string);
            delete user.password;
            const uploadedUser: DocumentReference<UserData> = await addDoc(this.usersCollection, {
              ...user,
              authUid: userCredential.user.uid,
              role: this.DEFAULT_ROLE,
            }) as DocumentReference<UserData>;

            const userSnap = await getDoc(uploadedUser);
            const userData = userSnap?.data() as UserData || null;
            this.userSub$.next(userData);
            resolve(userData);
          } catch (error: any) {
            this.userSub$.next(null);
            reject(error.message as string);
          }
        })();
      })
    ).pipe(
      this.sharedService.catchErrorAndAlert(),
    ));
  }

  loginWithGoogle(): Observable<UserData> {
    return defer(() => from(
        new Promise<UserData>((resolve, reject) => {
          (async () => {
            try {
              const userCredential = await signInWithPopup(this.auth, this.googleAuthProvider);
              const user = {
                email: userCredential.user.email,
                username: userCredential.user.displayName,
                image: userCredential.user.photoURL,
                role: this.DEFAULT_ROLE,
                authUid: userCredential.user.uid,
                provider: "google",
              };
              const uploadedUser: DocumentReference<UserData> = await addDoc(this.usersCollection, {
                ...user,
                role: this.DEFAULT_ROLE,
              }) as DocumentReference<UserData>;

              const userSnap = await getDoc(uploadedUser);
              const userData = userSnap?.data() as UserData || null
              resolve(userData);
            } catch (error: any) {
              this.userSub$.next(null);
              reject(error.message as string);
            }
          })();
        })
      ).pipe(
        this.sharedService.catchErrorAndAlert(),
      )
    );
  }

  login(user: UserLogin): Observable<UserData | null> {
    return defer(() => from(
        new Promise<UserData | null>((resolve, reject) => {
          // Using this method to avoid Promise constructor anti-pattern.
          (async () => {
            try {
              const userCredential = await signInWithEmailAndPassword(this.auth, user.email, user.password as string);
              const userData: UserData | null = await this.getUserFromStorage(userCredential.user.uid) as UserData;
              resolve(userData);
            } catch (error: any) {
              this.userSub$.next(null);
              reject(error.message as string);
            }
          })();
        })
      ).pipe(
        this.sharedService.catchErrorAndAlert(),
      )
    );
  }

  logout(): Observable<string | null> {
    return defer(() => from(
        new Promise<string | null>((resolve, reject) => {
          (async () => {
            try {
              await signOut(this.auth);
              resolve(null);
            } catch (error: any) {
              reject(error.message as string);
            }
          })();
        })
      ).pipe(
        this.sharedService.catchErrorAndAlert(),
      )
    );
  }
}
