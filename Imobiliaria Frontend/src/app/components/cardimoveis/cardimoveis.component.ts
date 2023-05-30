import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IImovel } from 'src/app/model/IImovel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cardimoveis',
  templateUrl: './cardimoveis.component.html',
  styleUrls: ['./cardimoveis.component.css'],
})
export class CardimoveisComponent implements OnInit {
  @Input() imovel: any;
  public valor: string = '';
  public cidade: string = '';
  public bairro: string = '';
  public codigo: string = '';
  public cep: string = '';
  public quartos: string = '';
  public banheiros: string = '';
  public vaga: string = '';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.valor = this.imovel.valorImovel;
    this.cidade = this.imovel.cidade;
    this.bairro = this.imovel.bairro;
    this.codigo = this.imovel.id;
    this.cep = this.imovel.cep;
    this.quartos = this.imovel.quartos;
    this.banheiros = this.imovel.banheiros;
    this.vaga = this.imovel.garagem;
  }
  deletarImovel() {
    this.dataService
      .deleteImovel(this.imovel.id)
      .then((imovel) => console.log(imovel))
      .catch((error) => console.log(error));
  }
}
