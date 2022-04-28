import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthCanActivateGuard } from './auth-can-activate.guard';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponentCanActivateGuardGuard } from './auth-component-can-activate.guard.guard';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthCanActivateGuard,
    AuthComponentCanActivateGuardGuard,
    AuthService,
  ]
})
export class AuthModule {}
