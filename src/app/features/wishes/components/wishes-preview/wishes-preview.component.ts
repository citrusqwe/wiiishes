import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  BehaviorSubject,
  catchError, EMPTY, finalize,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError
} from "rxjs";
import {FullWishItem, WishesApiService} from "../../services/wishes-api.service";
import { TuiDestroyService, TuiLetModule } from "@taiga-ui/cdk";
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiFileLike, TuiInputFilesModule, TuiMarkerIconModule, TuiFilesModule, TuiInputModule, TuiSelectModule, TuiFieldErrorPipeModule } from "@taiga-ui/kit";
import {Rating} from "../wishes/wishes.component";
import {DocumentReference} from "@angular/fire/firestore";
import { TuiAlertService, TuiLinkModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiDataListModule } from "@taiga-ui/core";
import {AuthService} from "../../../../shared/services/auth/auth.service";
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { TuiDataListWrapperModule } from '@taiga-ui/kit/components/data-list-wrapper';
import { SkeletonDirective } from '../../../../shared/directives/skeleton/skeleton.directive';
import { NgTemplateOutlet, NgIf, AsyncPipe } from '@angular/common';

interface WishForm {
  title: string;
  description: string;
  rating: Rating;
  image: File;
}

interface WishEditForm extends Omit<WishForm, "image"> {
  id: string;
  image?: File | string;
}

@Component({
    selector: 'app-wishes-preview',
    templateUrl: './wishes-preview.component.html',
    styleUrls: ['./wishes-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
    standalone: true,
    imports: [
        TuiLetModule,
        NgTemplateOutlet,
        FormsModule,
        ReactiveFormsModule,
        SkeletonDirective,
        NgIf,
        TuiInputFilesModule,
        TuiMarkerIconModule,
        TuiLinkModule,
        TuiFilesModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiErrorModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiButtonModule,
        AsyncPipe,
        TuiFieldErrorPipeModule,
    ],
})
export class WishesPreviewComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly wishesApiService: WishesApiService = inject(WishesApiService);
  private readonly destroy$: TuiDestroyService = inject(TuiDestroyService);
  private readonly alertService: TuiAlertService = inject(TuiAlertService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  wishForm!: FormGroup;
  readonly wish$: BehaviorSubject<FullWishItem | null> = new BehaviorSubject<FullWishItem | null>(null);
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly imagePreview$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  rejectedFiles$: Subject<TuiFileLike | null> | null = null;
  loadedFiles$: Observable<TuiFileLike | null> | null = null;
  uid: number | null = null;

  readonly ratingSelect: Rating[] = [
    new Rating('still undecided', 0),
    new Rating('simply want🤓', 1),
    new Rating('want badly🤩', 2),
  ];

  get imageControl(): FormControl {
    return this.wishForm?.get('image') as FormControl;
  }

  get title(): string {
    return this.wishForm?.get('title')?.value;
  }

  initWishForm(): void {
    this.wishForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      rating: new FormControl(this.ratingSelect[0]),
      image: new FormControl(null, [Validators.required]),
    });

    this.rejectedFiles$ = new Subject<TuiFileLike | null>();
    this.loadedFiles$ = this.imageControl?.valueChanges.pipe(
      map((file: TuiFileLike | string) => {
        // TODO: мб где-то тут лучше делать запрос на файл в хранилище
        // console.log(file, this.title)
        const fileData = typeof file === 'string' ? {name: this.title || 'file name'} : file;

        if (file) {
          this.imagePreview$.next(typeof file === 'string' ? file : URL.createObjectURL(file as File));
        }

        return fileData;
      }),
    );
  }

  addIdControlToWishForm(wish: FullWishItem): void {
    this.wishForm.addControl('id', new FormControl(wish.id));
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$?.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.imageControl?.setValue(null);
    this.imagePreview$.next(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$?.next(null);
  }

  //TODO: надо переписать
  createWish(): void {
    const data: WishForm = this.wishForm?.getRawValue();
    data.rating = JSON.parse(JSON.stringify(data.rating));

    // TODO: add remove image from storage on fail
    this.isLoading$.next(true);
    this.authService.authUser$.pipe(
      switchMap((user) =>
        this.wishesApiService.loadImage(data.image).pipe(
          map((image: string | null) => ({...data, image, markedAsGift: false, userId: user?.uid as string})),
          switchMap((data) => this.wishesApiService.makeWish(data)),
          catchError((error) => throwError(() => error)),
          tap(() => {
            console.log('here', user)
            this.alertService.open("you're successfully make a wish🥳", {status: "success"}).subscribe()
            this.router.navigate(['../']);
          }),
          finalize(() => this.isLoading$.next(false)),
        )
      ),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  //TODO: надо переписать
  editWish(): void {
    const data: WishEditForm = this.wishForm?.getRawValue();
    data.rating = JSON.parse(JSON.stringify(data.rating));

    this.isLoading$.next(true);
    if (typeof data.image === 'string') {
      delete data.image;
      this.wishesApiService.editWish(data as FullWishItem).pipe(
        tap(() => this.alertService.open("you're successfully edit a wish🥳", {status: "success"}).subscribe()),
        catchError((error) => throwError(() => error)),
        finalize(() => this.isLoading$.next(false)),
      ).subscribe((data: DocumentReference) => console.log(data));
    } else {
      this.wishesApiService.loadImage(data.image as File).pipe(
        map((image: string | null) => {
          if (!image) {
            return data;
          }

          return ({...data, image});
        }),
        switchMap((data) => this.wishesApiService.editWish(data as FullWishItem)),
        tap(() => this.alertService.open("you're successfully edit a wish🥳", {status: "success"}).subscribe()),
        catchError((error) => throwError(() => error)),
        finalize(() => this.isLoading$.next(false)),
      ).subscribe((data: DocumentReference) => console.log(data));
    }
  }

  ngOnInit(): void {
    this.initWishForm();

    this.activatedRoute.params.pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap((params) => {
        this.uid = params['uid'] || null;
        if (!params['id']) {
          this.isLoading$.next(false);
          return EMPTY
        }

        return this.wishesApiService.getById(params['id']);
      }),
      tap((wish) => {
        this.addIdControlToWishForm(wish);
        this.wish$.next(wish);
        this.wishForm.patchValue(wish);
        this.isLoading$.next(false);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
