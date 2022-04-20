import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';



@NgModule({
  declarations: [
    ProductComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
