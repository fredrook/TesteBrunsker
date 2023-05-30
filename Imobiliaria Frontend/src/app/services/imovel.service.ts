import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnamneseService extends DataService {
  baseUrl = environment.baseUrl;
  
  salvar(data: any) {
    return this.post<any>(`${this.baseUrl}api/anamnese/salvar`, data);
  }

  listar(id: any) {
    return this.get<any>(
      `${this.baseUrl}api/anamnese/listar/?idPaciente=${id}`
    );
  }

  obter(idPaciente: any, idAnamnese: any) {
    return this.get<any>(
      `${this.baseUrl}api/anamnese/obter/?idPaciente=${idPaciente}&idAnamense=${idAnamnese}`
    );
  }

  excluir(idPaciente: any, idAnamnese: any) {
    return this.get<any>(
      `${this.baseUrl}api/anamnese/excluir/?idPaciente=${idPaciente}&idAnamnese=${idAnamnese}`
    );
  }
}
