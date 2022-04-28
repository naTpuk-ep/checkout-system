import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, IProduct } from '../../services/cart.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnDestroy {

  product: IProduct = {
    name: 'Product',
    description: 'short description',
    price: 40,
  };
  productFormGroup!: FormGroup;
  private fb = new FormBuilder();
  private submitSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.initProductFormGroup();
    this.whenFormSubmitted();
  }

  ngOnDestroy() {
    this.submitSubscription.unsubscribe();
  }

  get formControl() {
    return this.productFormGroup.get('products') as FormControl;
  }

  private whenFormSubmitted() {
    this.submitSubscription = this.formControl.valueChanges.subscribe((list: IProduct[]) => {
      this.cartService.productList$$.next(list);
      this.router.navigate(['store/checkout']);
    });
  }

  private initProductFormGroup() {
    this.productFormGroup = this.fb.group({
      products: [
        this.cartService.productList$$.getValue(),
        { updateOn: 'submit' },
      ],
    });
  }
}
