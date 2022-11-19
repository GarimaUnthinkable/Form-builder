import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  constructor(private http: HttpClient) {}

  postUser(store: any) {
    return this.http.post<any>('http://localhost:3000/forms', store).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUser() {
    return this.http.get<any>('http://localhost:3000/forms').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUser(store: any, id: any) {
    return this.http.put<any>('http://localhost:3000/forms' + id, store).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteUser(id: any) {
    return this.http.delete<any>('http://localhost:3000/forms' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
