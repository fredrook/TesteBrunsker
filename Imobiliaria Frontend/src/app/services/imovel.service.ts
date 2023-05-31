import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImovel } from '../model/IImovel';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  constructor(private http: HttpClient) {}

  salvar(data: any) {
    return this.http.post<any>(`api/Imovel/salvar`, data);
  }

  listar(data: any) {
    return this.http.get<any[]>(`api/Imovel/listar`, data);
  }

  obter(id: number) {
    return this.http.get<any>(`api/Imovel/obter?idImovel=${id}`);
  }

  alterarValor(id: number, altVal: boolean) {
    return this.http.get<any>(
      `api/Imovel/alterarValor?idImovel=${id}&alterarValor=${altVal}`
    );
  }

  excluir(id: number) {
    return this.http.delete(`api/Imovel/excluir?idImovel=${id}`);
  }
}
