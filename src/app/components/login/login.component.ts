import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmpresasService],
});
export class LoginComponent implements OnInit {
  public usuarioModel: Empresa;

  constructor(
    private _empresaService: EmpresasService,
    private _router: Router
  ) {
    this.usuarioModel = new Empresa('', '', '', '', '', '');
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem("token"))
  }

  getToken() {
    this._empresaService.login(this.usuarioModel, 'true').subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getTokenPromesa(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._empresaService.login(this.usuarioModel, 'true').subscribe(
        (response) => {
          // console.log(response);
          localStorage.setItem('token', response.token);
          resolve(response);
        },
        (error) => {
          console.log(<any>error);
        }
      );
    });
  }

  login() {
    this._empresaService.login(this.usuarioModel, 'false').subscribe(
      (response) => {
        this.getTokenPromesa().then((respuesta) => {
          localStorage.setItem('identidad', JSON.stringify(response.empresa));

          this._router.navigate(['/pagina-inicio']);
        });
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
