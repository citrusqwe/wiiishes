import {inject, Injectable} from '@angular/core';
import {catchError, defer, from, Observable, pipe, throwError, UnaryFunction} from "rxjs";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly alertService: TuiAlertService = inject(TuiAlertService);

  private storage: Storage = inject(Storage);

  attachCatchError(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      catchError(error => {
        this.alertService.open(error.message || error, {status: "error"}).subscribe();
        return throwError(() => error);
      }),
    );
  }

  catchErrorAndAlert<T>(): UnaryFunction<Observable<T>, Observable<T>> {
    return pipe(
      catchError(error => {
        this.alertService.open(error.message || error, {status: "error"}).subscribe();
        return throwError(() => error);
      }),
    );
  }

  loadImage(file: File): Observable<string | null> {
    return this.attachCatchError(
      defer(
        () => from(new Promise<string | null>((resolve, reject) => {
          // Using this method to avoid Promise constructor anti-pattern.
          (async () => {
            if (!file) resolve(null);
            try {
              const storageRef = ref(this.storage, file.name);
              const uploadedFile = await uploadBytesResumable(storageRef, file);
              const uploadedFileUrl = await getDownloadURL(uploadedFile.ref);
              resolve(uploadedFileUrl);
            } catch (error: any) {
              reject(error.message as string);
            }
          })();
        }))
      )
    );
  }
}
