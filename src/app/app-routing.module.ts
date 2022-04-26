import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthCanActivateGuard } from './auth/auth-can-activate.guard';
import { AuthComponentCanActivateGuardGuard } from './auth/auth-component-can-activate.guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthComponentCanActivateGuardGuard],
  },
  {
    path: 'store',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthCanActivateGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'store'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
