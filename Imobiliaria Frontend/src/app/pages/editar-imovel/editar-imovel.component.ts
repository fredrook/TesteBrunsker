import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject } from 'rxjs';
import { IImovel } from 'src/app/model/IImovel';
import { DataService } from 'src/app/services/data.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.css'],
})
export class EditarImovelComponent implements OnInit {
  public meuId = 0;
  public imovel = new ReplaySubject<IImovel>;
  public cidade = '';
  public logradouro = '';
  public code = '';
  public valor = '';
  public quartos = ''
  public banheiros = ''
  public garagem = '';
  public myEditform: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.myEditform = this.fb.group({
      cidade:['',Validators.required],
      bairro:['',Validators.compose([Validators.required,Validators.minLength(3)]) ],
      valor:['',Validators.required],
      cep:['',Validators.required],
      banheiros:['',Validators.required],
      code:['',Validators.required],
      garagem:['',Validators.required],
      quartos:['',Validators.required]
    });
  }
  ngOnInit(): void {}

  acionar(){
    let imovelIDvalue = (document.getElementById("imovelID") as HTMLInputElement).value
    let idImovel = parseInt(imovelIDvalue)
    this.buscarImovelById(idImovel)
    
   

  }

  buscarImovelById(id: number) {
    this.dataService.getImovel(id).then(imovel =>
      {
        this.cidade = imovel.cidade,
        this.banheiros = imovel.banheiros,
        this.logradouro = imovel.bairro,
        this.code = imovel.cep,
        this.garagem = imovel.garagem,
        this.quartos = imovel.quartos,
        this.valor = imovel.valorImovel


      }
      ).catch(error => console.log(error))
    
   
  }
  chamaAtualizar(){
    this.atualizarImovel(this.meuId)
    
  }
  atualizarImovel(id:number){
    const newImovel: IImovel={
      id: this.meuId,
      cidade : this.myEditform.controls['cidade'].value,
      bairro : this.myEditform.controls['bairro'].value,
      cep :    this.myEditform.controls['code'].value,
      quartos : this.myEditform.controls['quartos'].value,
      banheiros : this.myEditform.controls['banheiros'].value,
      garagem : this.myEditform.controls['garagem'].value,
      valorImovel : this.myEditform.controls['valor'].value,
      corretorCode :'0'
    };
    this.dataService.putImovel(newImovel).subscribe()
    
  }
  
 
}
