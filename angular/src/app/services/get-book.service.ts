import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GetBook} from "../getBook";
import { environment } from './../../environments/environment';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class GetBookService {

  apiUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  getHeaderOptions(noContentType?: boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache'
      })
    };

    /* send os and browser information - starts */

    /* send os and browser information - ends */

    if (!noContentType) {
      httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    }
  }

  getDataPost() : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book/getAllBook`, this.getHeaderOptions());
  }

  getData() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/getAllBook`);
  }

}
