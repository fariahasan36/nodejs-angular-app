import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetEmployee} from "../getEmployee";

@Injectable({
  providedIn: 'root'
})

export class GetEmployeeService {

  private apiUrl = "http://localhost:3000/getEmployee";

  constructor(private http: HttpClient) { }

  getData() : Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
