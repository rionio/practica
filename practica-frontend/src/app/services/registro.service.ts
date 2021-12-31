import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Options } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  BASE_URL: string='http://localhost:5000';

  constructor(private _httpCliente:HttpClient) { }

  getSessions(options: any): Observable<any[]> {
    return this._httpCliente.post<any[]>(`${this.BASE_URL}/registro`, options );
  }
}
