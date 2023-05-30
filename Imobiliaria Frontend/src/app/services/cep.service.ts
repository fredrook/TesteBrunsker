import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICep } from '../model/ICep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getCEP(cep: number) {
    return this.http.get<ICep>('https://viacep.com.br/ws/' + cep + '/json/');
  }
}
