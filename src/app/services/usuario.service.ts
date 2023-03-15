import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario | undefined;

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('correo', () => {

    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        const { email, nombres, apellidos, rut, roles, fechaNacimiento, telefono, img, nivel, categoria, subCategoria } = resp.usuario;

        this.usuario = new Usuario(
          email,
          '',
          rut,
          nombres,
          apellidos,
          google,
          roles,
          fechaNacimiento,
          telefono,
          img,
          nivel,
          categoria,
          subCategoria
        );
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  signup(formData: RegisterForm) {
    console.log('creando usuario');
    return this.http.post(`${base_url}/auth/signup`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  // Problema LoginForm, no divide segun la interfaz, se utiliza any
  //  signin(formData: LoginForm) {
  signin(formData: any) {
    console.log('logeando usuario');
    return this.http.post(`${base_url}/auth/signin`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/auth/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
