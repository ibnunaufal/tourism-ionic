import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { timeout, catchError } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private error: ErrorService,
  ) { }

  get(url) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Application": "application/json",
    });
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: headers,
        observe: 'response' as 'response'
      };
      this.http
        .get(environment.API_URL + url, httpOptions)
        .pipe(
          timeout(environment.TIMEOUT),
          catchError(this.error.handleError)
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }


  auth(url) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Application": "application/json",
    });
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: headers,
        observe: 'response' as 'response'
      };
      this.http
        .get(environment.API_URL + url, httpOptions)
        .pipe(
          timeout(environment.TIMEOUT),
          catchError(this.error.handleError)
        )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  post(url, data) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Application": "application/json",
      "Accept": "application/json"
    });
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: headers,
        observe: 'response' as 'response'
      };
      this.http.post(environment.API_URL + url, data, httpOptions).pipe(
        timeout(environment.TIMEOUT),
        catchError(this.error.handleError)
      ).subscribe((response: any) => {
        resolve(response)
      }, reject);
    });
  }

  

  // login(data) {
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .post(environment.API_URL + "katalis/login", data, {
  //         observe: "response",
  //       })
  //       .pipe(timeout(environment.TIMEOUT), catchError(this.error.handleError))
  //       .subscribe((data) => {
  //         this.storage
  //           .set(
  //             "token",
  //             data.headers.get("Authorization").replace("Bearer ", "")
  //           )
  //           .then(() => {
  //             // this.token = data.headers
  //             //   .get("Authorization")
  //             //   .replace("Bearer ", "");

  //             // this.authState.next(true);
  //             console.log(data)
  //             resolve(data);
  //           });
  //       }, reject);
  //   });
  // }

  
}
