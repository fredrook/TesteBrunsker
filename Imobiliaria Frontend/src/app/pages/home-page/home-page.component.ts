import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  imoveis: any;

  crudFormBuscarImovel: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private imoveisService: ImovelService
  ) {
    this.crudFormBuscarImovel = this.formBuilder.group({
      idImovel: [0],
      cidade: [null],
      bairro: [null],
    });
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    const filtro = {
      idImovel: this.crudFormBuscarImovel!.value.idImovel,
      nome: this.crudFormBuscarImovel!.value.nome,
      bairro: this.crudFormBuscarImovel!.value.bairro,
    };
    this.imoveisService.listar(filtro).subscribe(
      (data: any) => {
        this.imoveis = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  limpar() {
    this.crudFormBuscarImovel!.reset();
    this.listar();
  }

  excluir(idImovel: number) {
    this.imoveisService.excluir(idImovel).subscribe(
      (data: any) => {
        this.listar();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
