import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  getUsers<T>():Observable<T>{
    return this.http.get<T>("https://patika-server-app.herokuapp.com/users").pipe();
  }
  registerUser<T>(req:any):Observable<T>{
    return this.http.post<T>("https://patika-server-app.herokuapp.com/users",req).pipe();
  }
}
