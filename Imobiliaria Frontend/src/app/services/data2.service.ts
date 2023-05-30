import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImovel } from '../model/IImovel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getImoveis() {
    return this.http.get<any[]>('http://localhost:5257/v1/imoveis/');
  }
  getImovel(id: number) {
    return this.http
      .get<any>('http://localhost:5257/v1/imoveis/' + id)
      .toPromise();
  }
  postImovel(imovel: IImovel) {
    return this.http
      .post<IImovel>('http://localhost:5257/v1/imoveis/', imovel)
      .toPromise();
  }
  putImovel(imovel: IImovel) {
    return this.http.put<IImovel>(
      'http://localhost:5257/v1/imoveis/' + imovel.id,
      imovel
    );
  }
  deleteImovel(imovelID: number) {
    return this.http
      .delete('http://localhost:5257/v1/imoveis/' + imovelID)
      .toPromise();
  }
}
