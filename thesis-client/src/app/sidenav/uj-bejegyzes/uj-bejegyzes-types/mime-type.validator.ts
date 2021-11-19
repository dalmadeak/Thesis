import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeType = (control: AbstractControl): Promise<any> | Observable<any> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const fileReaderObservable = new Observable((observer: Observer<any>) => {
      fileReader.addEventListener("loadend", () => {
        const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        let isValid = false;

        for (let i = 0; i < array.length; i++) {
          header += array[i].toString(16);

        }

        switch (header) {
          case "25504446":
            isValid = true;
            break;
          case "504b34":
          case "504b56":
          case "504b58":
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }

        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }

        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return fileReaderObservable;
};
