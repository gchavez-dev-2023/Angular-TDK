import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public formSubmmited = false;

  public registerForm = this.fb.group({
    rut: ['1292', [Validators.required]],
    nombres: ['Gustavo Gabriel', [Validators.required]],
    apellidos: ['Chavez', [Validators.required]],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService) {

  }

  crearUsuario() {
    this.formSubmmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    //realizar posteo
    this.usuarioService.signup(this.registerForm.value)
      .subscribe(resp => {
        console.log('usuario creado');
        console.log(resp);
      }, (err) => {
        //console.warn(err.error.msg)
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmmited) {
      return true;
    }
    return false;
  }

  aceptaTerminos(): boolean {
    if (!this.registerForm.get('terminos')?.value && this.formSubmmited) {
      return true;
    }
    return false;
  }

  passwordsNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmmited) {
      return true;
    }
    return false;
  }

  //Se crea entrada que permita activar error en el formgroup cuando password no son iguales.
  passwordIguales(pass1Name: string, pass2Name: string) {
    //Se debe retornar funcion de flecha
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      //Si la validacion no tiene problemas se devuelve objeto nulo
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else { //si hay error se devuelve un objeto con una propiedad indicado el error
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
}
