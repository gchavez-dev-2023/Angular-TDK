import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public registerForm = this.fb.group({
    nombre: ['Gustavo', [Validators.required]],
    email: ['test100@gmail.com', [Validators.required]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.required]],
  });

  constructor( private fb: FormBuilder){

  }
  crearUsuario(){
    console.log(this.registerForm.value);
  }
}
