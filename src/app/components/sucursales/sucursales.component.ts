import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sucursales } from 'src/app/models/sucursales.model';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss'],
  providers: [SucursalesService],
});

export class SucursalesComponent implements OnInit {
  public sucursalModelGet: Sucursales;
  public sucursalModelPost: Sucursales;
  public sucursalModelGetId: Sucursales;
  public token;

  constructor(private _sucursalesService: SucursalesService) {
    this.sucursalModelPost = new Sucursales('', '', '', '', '');
    this.sucursalModelGetId = new Sucursales('', '', '', '', '');

    this.token = this._sucursalesService.obtenerToken();
  }
  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales() {
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.sucursalModelGet = response.sucursales;
        console.log(this.sucursalModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postSucursales() {
    this._sucursalesService.agregarSucursal(this.sucursalModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getSucursales();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getSucursalId(idSucursal) {
    this._sucursalesService.obtenerSucursalId(idSucursal).subscribe(
      (response) => {
        console.log(response);
        this.sucursalModelGetId = response.sucursal;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putSucursales() {
    this._sucursalesService.editarSucursal(this.sucursalModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getSucursales();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteSucursales(idSucursal) {
    this._sucursalesService.eliminarSucursal(idSucursal).subscribe(
      (response) => {
        console.log(response);
        this.getSucursales();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
