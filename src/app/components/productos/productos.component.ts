import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Productos } from 'src/app/models/productos.models';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosSucursales } from 'src/app/models/productos-sucursales.model';
import { ProductosSucursalesService } from 'src/app/services/productos-sucursales.service';
import { Sucursales } from 'src/app/models/sucursales.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ProductosService, ProductosSucursalesService],
});

export class ProductosComponent implements OnInit {
  public productoModelGet: Productos;
  public productoSucursalModelGet: ProductosSucursales;
  public productoModelPost: Productos;
  public productoSucursalModelPost: ProductosSucursales;
  public productoModelGetId: Productos;
  public sucursalModelPost: Sucursales;
  public token;
  public search;

  constructor(
    private _productosService: ProductosService,
    private _productosSucursalesService: ProductosSucursalesService
  ) {
    this.productoModelPost = new Productos('', '', '', 0, '');
    this.sucursalModelPost = new Sucursales('', '', '', '', '');
    this.productoModelGetId = new Productos('', '', '', 0, '');
    this.productoSucursalModelPost = new ProductosSucursales(
      '',
      '',
      0,
      0,
      '',
      ''
    );

    this.token = this._productosService.obtenerToken();
    this.token = this._productosSucursalesService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productosService.obtenerProductos(this.token).subscribe(
      (response) => {
        this.productoModelGet = response.productos;
        console.log(this.productoModelGet);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getProductosSucursales() {
    this._productosSucursalesService
      .obtenerProductosSucursales(this.token)
      .subscribe(
        (response) => {
          this.productoSucursalModelGet = response.ProductosSucursales;
          console.log(this.productoSucursalModelGet);
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  postProductos() {
    this._productosService.agregarProductos(this.productoModelPost).subscribe(
      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postProductosSucursales() {
    this._productosSucursalesService
      .editarProductosSucursales(
        this.productoSucursalModelPost,
        this.productoModelGetId
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.productoModelGetId = response.producto;
          //this.getProductos();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getProductosId(idProducto) {
    this._productosService.obtenerProductosId(idProducto).subscribe(
      (response) => {
        console.log(response);
        this.productoModelGetId = response.producto;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putProductos() {
    this._productosService.editarProductos(this.productoModelGetId).subscribe(
      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteProductos(idProducto) {
    this._productosService.eliminarProductos(idProducto).subscribe(
      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
