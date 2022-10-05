import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];
  showImage = false;
  private _filterList = '';

  public get filterList(){
    return this._filterList;
  }

  public set filterList(value: string){
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.filterEventos(this.filterList) : this.eventos;
  }

  filterEventos(filterBuy: string): any{
    filterBuy = filterBuy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: {userName: string; eventoId: number;}) => evento.userName.toLocaleLowerCase().indexOf(filterBuy) !== -1
    );
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      reponse =>{
        this.eventos = reponse;
        this.eventosFiltrados = this.eventos;

      },
      error => console.log(error),
    );
  }

  toggleImage(){
    this.showImage = !this.showImage;
  }

}
