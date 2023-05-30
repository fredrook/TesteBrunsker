import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { buffer, concatWith, map, observable, Observable, ReplaySubject } from 'rxjs';
import { IImovel } from 'src/app/model/IImovel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-imoveis-page',
  templateUrl: './imoveis-page.component.html',
  styleUrls: ['./imoveis-page.component.css'],
})
export class ImoveisPageComponent implements OnInit {
  //public imoveis= new ReplaySubject<IImovel[]>;
  public imoveis: Observable<any[]> = new ReplaySubject<any[]>
  
 @Input() imovel = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getImoveis();
    
    
   
  }

  getImoveis() {
    this.imoveis = this.dataService.getImoveis();

    // this.dataService.getImoveis().pipe(
    //   map(value => value)
    // ).subscribe(this.imoveis)
    
     
  }
  
  
  
}
