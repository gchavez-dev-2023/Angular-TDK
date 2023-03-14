import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public formSubmmited = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [true],
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) {

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '1059486844327-16sucsgpr7mmlp1c7v23v9iefuqjq91c.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredendialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttondiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredendialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        console.log({ login: resp });

        this.ngZone.run(() =>{
          //Navegar al inicio
          this.router.navigateByUrl('/');
        });
      });
  }

  login() {
    this.formSubmmited = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    //realizar login
    this.usuarioService.signin(this.loginForm.value)
      .subscribe(resp => {
        console.log('usuario logeado');
        console.log(resp);
        if (this.loginForm.get('remember')?.value) {
          //ver porque el valor queda como nulo
          const email = this.loginForm.get('email')?.value || '';
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        //Navegar al inicio
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

    //this.router.navigateByUrl('/');
  }
}
