import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService, IProduct } from '../../services/cart.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {

  product: IProduct = {
    name: 'Product',
    description: 'short description',
    price: 40,
  };

  fb = new FormBuilder();
  productFormGroup!: FormGroup;

  productFormControl!: FormControl;

  productList: IProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.initProductFormGroup();
    this.formControl.valueChanges.subscribe(this.cartService.productList$$);
  }

  get formControl() {
    return this.productFormGroup.get('products') as FormControl;
  }

  private initProductFormGroup() {
    this.productFormGroup = this.fb.group({
      products: [this.productList, { updateOn: 'submit' }],
    });
  }
}
