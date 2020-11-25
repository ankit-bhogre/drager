import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError,Observable } from 'rxjs';
import { retry,catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private http:HttpClient) { }

  post(url,data):Observable<any>{
    return this.http.post<any>(url,data).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }
  get(url):Observable<any>{
    return this.http.get<any>(url).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }

   // for handle unknown error  
   handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = error.error.error;
    }
      window.alert(errorMessage);
      return throwError(errorMessage);
      }

}
