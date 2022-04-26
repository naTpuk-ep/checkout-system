import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {}
