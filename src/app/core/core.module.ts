import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';
import { CoreRoutingModule } from './core-routing.module';
import { CommonModule } from '@angular/common';
import { QuantityComponent } from './components/product/quantity/quantity.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CoreRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProductComponent,
    CheckoutComponent,
    SuccessComponent,
    QuantityComponent,
  ],
})
export class CoreModule {}
