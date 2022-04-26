import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from '../core/core.module';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
})
export class LayoutModule {}
