import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})

export class BreadcrumbsComponent {
  public titulo: string | undefined;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
      )
      .subscribe(event => {
        console.log(event);
      });
    /*.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) => event.snapshot.data),

    )
    .subscribe(({ titulo}) => {
      this.titulo = titulo;
    });*/

  }
}
