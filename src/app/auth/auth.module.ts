import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthCanActivateGuard } from './auth-can-activate.guard';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponentCanActivateGuard } from './auth-component-can-activate.guard';



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
    AuthComponentCanActivateGuard,
    AuthService,
  ]
})
export class AuthModule {}
