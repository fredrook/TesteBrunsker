import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, observable, Observable, ReplaySubject } from 'rxjs';
import { ICep } from 'src/app/model/ICep';
import { IImovel } from 'src/app/model/IImovel';
import { CepService } from 'src/app/services/cep.service';
import { DataService } from 'src/app/services/data.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-cadastro-imovel-page',
  templateUrl: './cadastro-imovel-page.component.html',
  styleUrls: ['./cadastro-imovel-page.component.css'],
})
export class CadastroImovelPageComponent implements OnInit {
public mycep = '';
public cep= new ReplaySubject<ICep>;  
public imovel: any;
public cidade = '';
public quartos = '';
public garagem = '';
public banheiros = '';
public bairro = '';
public code = ''
public valor = ''
public myform: FormGroup;



  constructor(private dataService: DataService,private cepService: CepService,private fb: FormBuilder) {
  
    this.myform = this.fb.group({
      cidade:['',Validators.required],
      bairro:['',Validators.compose([Validators.required,Validators.minLength(3)]) ],
      valor:['',Validators.required],
      cep:['',Validators.required],
      banheiros:['',Validators.required],
      code:['',Validators.required],
      garagem:['',Validators.required],
      quartos:['',Validators.required]
    })

  }

  ngOnInit(): void {
    
  }
  acionar(){
    let mycep = (document.getElementById("cep") as HTMLInputElement).value
    let cep = parseInt(mycep)
    this.chamarCep(cep)
   

  }
  
  chamarCep(cep:number){
    this.cepService.getCEP(cep).pipe(
      map(value => {this.cidade=(value.localidade)
           this.bairro=(value.bairro)
          this.code=(value.cep)})).subscribe();  
    
    
  }
  cadastrarImovel(){    
      const imovel: IImovel= {
          cidade : this.cidade,
       bairro : this.bairro,
       cep :    this.code,
       quartos : this.myform.controls['quartos'].value,
       banheiros : this.myform.controls['banheiros'].value,
       garagem : this.myform.controls['garagem'].value,
       valorImovel : this.myform.controls['valor'].value,
       corretorCode :'0'
      } 

      this.dataService.postImovel(imovel).then(imovel => console.log(imovel)).catch(error => console.log(error));
     
     

  
  }
  
      
    
    
  }
  


