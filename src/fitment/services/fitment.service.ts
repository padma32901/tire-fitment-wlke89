import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FitmentService {
  baseUrl = 'https://6080be3273292b0017cdbf2a.mockapi.io/';
  constructor(private http: HttpClient) {}
  getData(type: string = 'years', data: any = {}) {
    const url = this.baseUrl + type;
    return this.http.get(url).pipe(
      map((response: any) => response),
      catchError(err => {
        console.log(err);
        return of([]);
      })
    );
  }
}
