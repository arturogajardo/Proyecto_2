import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiURL:any = 'http://127.0.0.1:8000/api/users/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(public http:HttpClient) { }

  newUser(userData): Observable<any>{
    return this.http.post(this.apiURL,userData);
  }

  getid(id){
    return this.http.get(this.apiURL+id+'/');
  }
  getUsers(): Observable<any>{
    return this.http.get(this.apiURL);
  }

  login(users): Observable<any> {
    return this.http.post(this.apiURL, users);
  }

  update(user): Observable<any> {
    const body = {usuario: user.usuario , email: user.email, password: user.password };
    return this.http.put(this.apiURL + user.id + '/', body,
    {headers: this.httpHeaders});
  }
  deleteUser(id): Observable<any> {
    return this.http.delete(this.apiURL+ id + '/',);
  }
}
