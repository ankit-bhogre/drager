import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError,Observable,Subject,BehaviorSubject } from 'rxjs';
import { retry,catchError,map } from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
 
//  private user = new BehaviorSubject<any>('0');

   private user = new Subject<any>();
   castUser = this.user.asObservable();

  constructor(private http:HttpClient, private router: Router) { }

  post(url,data):Observable<any>{
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
          this.user.next(pdfname);
           console.log('test name', pdfname)}

      // ***************************Data Sharing close*******************************************

}
