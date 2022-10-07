import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  showImage = false;

  public eventos: any = [];
  public eventosFiltrados: any = [];
  private _filterList = '';

  public get filterList():string{
    return this._filterList;
  }

  public set filterList(value: string){
    this._filterList = value;
    console.log(this.eventosFiltrados = this.filterList ? "Tem" : "Void" )
    this.eventosFiltrados = this.filterList ? this.filterEventos(this.filterList) : this.eventos;
  }

  filterEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
     (evento: {tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
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
        this.eventosFiltrados =this.eventos;
      },
      error => console.log(error),
    );
  }

  toggleImage(){
    this.showImage = !this.showImage;
  }

}
