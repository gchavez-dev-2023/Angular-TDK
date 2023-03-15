import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: PerfilComponent, data: { titulo:'Perfil de usuario' }},
      //{ path: 'hijo', component: HijoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
