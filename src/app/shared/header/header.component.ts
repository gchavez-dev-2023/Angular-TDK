import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  public imgUrl;
  public fullName;
  public correo;

  constructor( private router: Router,
                private usuarioService: UsuarioService,
                private ngZone: NgZone){

                  this.imgUrl = usuarioService.usuario?.imagenUrl;
                  this.fullName = usuarioService.usuario?.nombreCompleto;
                  this.correo = usuarioService.usuario?.email;
  }

  logout(){
    this.usuarioService.logout(this.correo);
    this.ngZone.run(() =>{
      //Navegar al inicio
      this.router.navigateByUrl('/login');
    });
  }

}
