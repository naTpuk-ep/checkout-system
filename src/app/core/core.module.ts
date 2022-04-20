import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  imports: [
    CoreRoutingModule
  ],
  declarations: [
    ProductComponent,
    CheckoutComponent,
    SuccessComponent
  ],
})
export class CoreModule {}
