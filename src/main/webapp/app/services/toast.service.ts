import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  private openSnackBar(text: string, action: string, type: ToastType, isError: boolean) {
    this._snackBar.open(text, action, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: isError ? 10000 : 3000,
      panelClass: this.classFromType(type)
    });
  }

  private classFromType(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS : return 'green-snack';
      case ToastType.ERROR : return 'red-snack';
      case ToastType.WARNING : return 'yellow-snack';
    }
  }

  success(message: string, action: string) {
    this.openSnackBar(message, action, ToastType.SUCCESS, false);
  }

  warning(message: string, action: string) {
    this.openSnackBar(message, action, ToastType.WARNING, false);
  }

  error(message: string, action: string) {
    this.openSnackBar(message, action, ToastType.ERROR, true);
  }
}

export enum ToastType {
  SUCCESS,
  ERROR,
  WARNING
}
