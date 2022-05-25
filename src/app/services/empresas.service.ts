import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresas.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public headersToken = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.obtenerToken(),
  });

  public identidad;
  public token;

  constructor(public _http: HttpClient) {}

  login(empresa, obtenerToken = null): Observable<any> {
    if (obtenerToken != null) {
      empresa.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(empresa);

    return this._http.post(this.url + '/login', params, {
      headers: this.headersVariable,
    });
  }

  register(params) {
    return this._http.post(environment.apiURL + '/agregarEmpresas', params, {
      headers: this.headersVariable,
    });
  }

  updateUser(params, id) {
    return this._http.put(environment.apiURL + '/editarEmpresa/' + id, params, {
      headers: this.headersToken,
    });
  }

  obtenerToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != undefined) {
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  obtenerEmpresas(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/empresas', { headers: headersToken });
  }

  agregarEmpresa(params): Observable<any> {
    return this._http.post(environment.apiURL + '/agregarEmpresas', params, {
      headers: this.headersVariable,
    });
  }

  obtenerEmpresaId(id: String): Observable<any> {
    return this._http.get(this.url + '/empresas/' + id, {
      headers: this.headersVariable,
    });
  }

  editarEmpresaAdmin(modeloEmpresa: Empresa): Observable<any> {
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.put(
      this.url + '/editarEmpresaAdmin/' + modeloEmpresa._id,
      parametros,
      { headers: this.headersVariable }
    );
  }

  eliminarEmpresa(id: String): Observable<any> {
    return this._http.delete(this.url + '/eliminarEmpresa/' + id, {
      headers: this.headersVariable,
    });
  }
}
