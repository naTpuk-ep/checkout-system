import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SuccessComponent } from './components/success/success.component';
import { CoreRoutingModule } from './core-routing.module';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';



@NgModule({
  imports: [
    CoreRoutingModule,
    CommonModule,
  ],
  declarations: [
    ProductComponent,
    CheckoutComponent,
    SuccessComponent
  ],
  providers: [CartService]
})
export class CoreModule {}
