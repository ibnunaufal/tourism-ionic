import { Inject, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { AlertService } from "./alert.service";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor(
    private router: Router,
    private alert: AlertService
  ) {

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.log(error.message);

      return throwError("An error occurred: " + error.error.message);
    } else if (error.message == "Timeout has occurred") {
      return throwError("Timeout error, please try again.");
    }
    else if (error.status == 401) {
      console.log(error);
      if (error.message) {
        if (error.message == 'Expired JWT token') {
          return throwError("Your Session has timed out, please re-login again.");

        } else {
          return throwError("Username or password has not found.");
        }
      }

    }
    else {
      if (!environment.production) {
        return throwError(
          "RC: " +
          error.status +
          "<br>" +
          "Path: " +
          error.error.path +
          "<br>" +
          "Message: " +
          error.error.message
        );
      } else {
        return throwError(error.error.message);
      }
    }
  }
  handleError2(error: HttpErrorResponse) {
    if(error.status == 400 || error.message == "Failed to process otp"){
      return throwError("failedOtp")
    }else if (error.error instanceof ErrorEvent) {
      return throwError("An error occurred: " + error.error.message);
    }else{
      return throwError(error.error.message);
    }
  }
}
