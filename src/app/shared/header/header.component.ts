import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 constructor( private router: Router,
              private usuarioService: UsuarioService,
              private ngZone: NgZone){

 }

 logout(){
  this.usuarioService.logout();
  this.ngZone.run(() =>{
    //Navegar al inicio
    this.router.navigateByUrl('/login');
  });
 }

}
