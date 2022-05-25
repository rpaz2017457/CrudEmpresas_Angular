import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss'],
});

export class PaginaInicioComponent implements OnInit {
  public identidad;
  constructor() {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }
  ngOnInit(): void {}
}
