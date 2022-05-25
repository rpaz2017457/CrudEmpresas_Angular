import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
});

export class NavBarComponent implements OnInit {
  public identidad;

  constructor(public _empresaService: EmpresasService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
    this.identidad = this._empresaService.obtenerIdentidad;
  }

  ngOnInit(): void {
    console.log(this.identidad);
  }

  logOut() {
    localStorage.clear();
  }
}
