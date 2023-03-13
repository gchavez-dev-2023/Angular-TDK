import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap } from 'rxjs/operators'


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${base_url}/auth/google`, token)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
