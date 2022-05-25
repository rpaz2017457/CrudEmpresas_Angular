import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Empresa } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [EmpresasService],
});

export class DashboardComponent implements OnInit {
  public empresaModelGet: Empresa;
  public empresaModelPost: Empresa;
  public empresaModelGetId: Empresa;
  public identidad = localStorage.getItem('identidad');

  public token;

  constructor(private _empresaService: EmpresasService) {
    this.empresaModelPost = new Empresa('', '', '', '', '', '');
    this.empresaModelGetId = new Empresa('', '', '', '', '', '');

    this.token = this._empresaService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this._empresaService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        this.empresaModelGet = response.empresas;
        console.log(this.empresaModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postEmpresas() {
    this._empresaService.agregarEmpresa(this.empresaModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getEmpresaId(idEmpresa) {
    this._empresaService.obtenerEmpresaId(idEmpresa).subscribe(
      (response) => {
        console.log(response);
        this.empresaModelGetId = response.empresa;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putEmpresas() {
    this._empresaService.editarEmpresaAdmin(this.empresaModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteEmpresas(idEmpresa) {
    this._empresaService.eliminarEmpresa(idEmpresa).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
