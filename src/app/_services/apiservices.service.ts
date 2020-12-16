import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError,Observable,Subject,BehaviorSubject } from 'rxjs';
import { retry,catchError,map } from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
 
//  private user = new BehaviorSubject<any>('0');
    // private user = new Subject<any>();
   private user = new BehaviorSubject<any>(localStorage.setItem('quotename','Air Liquide - PA07302023'));
   castUser = this.user.asObservable();

  constructor(private http:HttpClient, private router: Router) { }
  // headers = new HttpHeaders();
  
  // post(url,data):Observable<any>{
  //   let headers = new HttpHeaders()
  //   headers=headers.append('loggeduserid','uploadbase'+'15');
  //   headers=headers.append('userpdfdir','mergebase'+'15');
  //   return this.http.post<any>(url,data,{'headers':headers}).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  // }
  post(url,data):Observable<any>{
    // let headers = new HttpHeaders()
    // headers=headers.append('loggeduserid','uploadbase'+'15');
    // headers=headers.append('userpdfdir','mergebase'+'15');
    return this.http.post<any>(url,data).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }
  get(url):Observable<any>{
    return this.http.get<any>(url).pipe( map( res=>{ if (!!res) { return res;} return false }), catchError(this.handleError))
  }
   
  dummyLogin(credential){
    if(credential.username == "admin" && credential.password == "123456"){
      let dummytoken = Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('usertoken',JSON.stringify(dummytoken));
      this.router.navigate(['']);
      return true }
    else { return false }
  }
  dummyLogout(){
    this.router.navigate(['/login']);
    localStorage.clear();
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
      // ***************************Data Sharing close*******************************************

         sharePdf(pdfname){ 
         
          // this.user.next(pdfname);
          this.user.next(localStorage.setItem('quotename',pdfname));
           console.log('test name', pdfname)}

      // ***************************Data Sharing close*******************************************

}
