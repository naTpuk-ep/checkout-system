import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CoreModule,
  ]
})
export class LayoutModule { }
