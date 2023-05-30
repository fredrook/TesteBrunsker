import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  imoveis: any;

  dadosClinica: any;

  crudFormPesquisarImoveis: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public toastrService: ToastrService,
    private appService: AppService,
    private imovelService: ImovelService
  ) {
    this.appService.pageTitle = 'Imoboliária';
  }

  ngOnInit() {
    this.crudFormPesquisarImoveis = this.formBuilder.group({
      nomeImovel: [null],
      idImovel: [null],
    });

    this.listar();
  }

  listar() {
    const filtro = {
      idClinica: this.appService.verificarNumeroVazio(
        this.crudFormPesquisarImoveis.value.idClinica
      ),
      nome: this.crudFormPesquisarImoveis.value.nome,
    };
    this.imovelService.listar(filtro).subscribe(
      (data) => {
        this.imoveis = data;
      },
      (err) => {
        this.appService.trataErro(err);
      }
    );
  }

  limpar() {
    this.crudFormPesquisarImoveis.reset();
    this.listar();
  }

  excluir(idClinica: number) {
    Swal({
      title: 'Atenção!',
      text: 'Tem certeza que deseja excluir?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir',
    }).then((result) => {
      if (result.value) {
        this.imovelService.excluir(idClinica).subscribe(
          (data) => {
            this.toastrService.success('Exclusão realizada com sucesso!');
            this.listar();
          },
          (err) => {
            this.appService.trataErro(err);
          }
        );
      }
    });
  }
}
