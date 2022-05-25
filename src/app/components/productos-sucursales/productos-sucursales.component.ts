import { Component, OnInit } from '@angular/core';
import { ProductosSucursales } from 'src/app/models/productos-sucursales.models';
import { ProductosSucursalesService } from 'src/app/services/productos-sucursales.service';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-productos-sucursales',
  templateUrl: './productos-sucursales.component.html',
  styleUrls: ['./productos-sucursales.component.scss'],
  providers: [ProductosSucursalesService, EmpresasService],
});

export class ProductosSucursalesComponent implements OnInit {
  public productoSucursalModelGet: ProductosSucursales;
  public productoSucursalModelGet1: any = [];
  public productoSucursalModelGetId: ProductosSucursales;
  public productoSucursalModelPost: ProductosSucursales;
  public token;
  public search;

  constructor(
    private _productosSucursalesService: ProductosSucursalesService,
    private _empresasServices: EmpresasService
  ) {
    this.productoSucursalModelGetId = new ProductosSucursales(
      '',
      '',
      0,
      0,
      '',
      ''
    );

    this.token = this._productosSucursalesService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductosSucursales1();
    this.getProductosSucursales();
  }

  getProductosSucursales() {
    this._productosSucursalesService
      .obtenerProductosSucursales(this.token)
      .subscribe(
        (response) => {
          this.productoSucursalModelGet = response.productosSucursales;
          console.log(this.productoSucursalModelGet);
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getProductosSucursales1() {
    this._productosSucursalesService
      .obtenerProductosSucursales(this.token)
      .subscribe(
        (response) => {
          this.productoSucursalModelGet1 = response.productosSucursales;
          this.productoSucursalModelGet1.forEach((dato) => {
            console.log(dato.nombre);
            this.chartLabels.push(dato.nombreProducto);
            this.chartData.push(dato.cantidadVendida);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
          });
          console.log(this.productoSucursalModelGet);
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getProductosSucursalesId(idProducto) {
    this._productosSucursalesService
      .obtenerProductosSucursalesId(idProducto)
      .subscribe(
        (response) => {
          console.log(response);
          this.productoSucursalModelGetId = response.producto;
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  putProductosSucursales() {
    this._productosSucursalesService
      .simularVenta(this.productoSucursalModelGetId)
      .subscribe(
        (response) => {
          console.log(response);
          this.getProductosSucursales();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  deleteProductosSucursales(idEmpresa) {
    this._productosSucursalesService
      .eliminarProductosSucursales(idEmpresa)
      .subscribe(
        (response) => {
          console.log(response);
          this.getProductosSucursales();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  chartOptions = {
    responsive: true,
  };
  chartLabels: any = [];
  chartData: any = [];
  chartColors: any = [
    {
      backgroundColor: [],
    },
  ];
  chartLegend = true;
  chartPlugins = [];
}
