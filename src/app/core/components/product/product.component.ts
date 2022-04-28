import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, IProduct } from '../../services/cart.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


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
  private productList!: IProduct[];
  private fb = new FormBuilder();
  private valueChangesSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.initProductList();
    this.initProductFormGroup();
    this.patchProductFormGroup();
    this.onValueChanges();
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
  }

  get formControl() {
    return this.productFormGroup.get('products') as FormControl;
  }

  submit() {
    this.router.navigate(['store/checkout']);
  }

  private onValueChanges() {
    this.valueChangesSubscription = this.formControl.valueChanges
      .subscribe(this.cartService.productList$$);
  }

  private initProductList() {
    this.productList = this.cartService.productList$$.getValue();
  }

  private patchProductFormGroup() {
    if (this.productList.length) {
      this.productFormGroup.patchValue(this.productList);
    }
  }

  private initProductFormGroup() {
    this.productFormGroup = this.fb.group({
      products: [
        [],
      ],
    });
  }
}
