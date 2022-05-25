import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursales } from 'src/app/models/sucursales.model';

@Component({
  selector: 'app-ver-sucursales',
  templateUrl: './ver-sucursales.component.html',
  styleUrls: ['./ver-sucursales.component.scss'],
  providers: [SucursalesService]
});

export class VerSucursalesComponent implements OnInit {
  sucur: any;
  load: boolean = false;

  public sucursalModelGetId: Sucursales;


  constructor(
    public _activatedRoute: ActivatedRoute,
    public _sucursalesService: SucursalesService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idSucursal'));
      this.getSucursalId(dataRuta.get('idSucursal'));
    })
  }

  getSucursalId(idSucursal){
    this._sucursalesService.obtenerSucursalId(idSucursal).subscribe({
      next:(response:any)=>{
        this.sucur = response.sucursal;
        this.load = true;
      },
      error:(err)=>alert(err.error.mensaje)
    })
  }

}
