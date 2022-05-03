import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserCheckoutInfo, PersonalService } from '../../services/personal.service';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {

  totalPaymentAmount!: number;
  mode!: 'edit' | 'view';
  formGroup!: FormGroup;
  private fb = new FormBuilder();
  private initialUserCheckoutInfo!: IUserCheckoutInfo | null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private personalService: PersonalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initUserCheckoutInfo();
    this.setTotalPaymentAmount();
    this.initFormGroup();
    this.setFormGroupValue();
    this.initMode();
  }

  get formValue() {
    return this.formGroup.value as IUserCheckoutInfo;
  }

  get creditCardMask() {
    return `${this.formValue.creditCard}`
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 **** **** $4');
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.mode === 'edit') {
        this.personalService.userCheckoutInfo$$.next(this.formValue);
      }
      this.cartService.productList$$.next([]);
      this.router.navigate(['store/success']);
    }
  }

  cvvInput(event: Event) {
    const target = <HTMLInputElement>event.target;
    if (`${target.value}`.length > 3) {
      target.value = `${this.formValue.cvv}`
    }
    this.formGroup.patchValue({ cvv: +target.value || null });
  }

  creditCardInput(event: Event) {
    const target = <HTMLInputElement>event.target;
    target.value = target.value.replace(/\D/g, '');
    if (`${target.value}`.length > 16) {
      target.value = `${this.formValue.creditCard}`
    }
    this.formGroup.patchValue({ creditCard: target.value });
    target.value = target.value.replace(/(\d{4})/g, '$1 ');
  }

  private initMode() {
    if (this.initialUserCheckoutInfo) {
      this.mode = 'view';
    } else {
      this.mode = 'edit';
    }
  }

  private initUserCheckoutInfo() {
    this.initialUserCheckoutInfo = this.personalService.userCheckoutInfo$$.getValue();
  }

  private setTotalPaymentAmount() {
    this.totalPaymentAmount = this.cartService.productList$$.getValue()
      .reduce((sum, product) => sum + product.price, 0);
  }

  private setFormGroupValue() {
    if (this.initialUserCheckoutInfo) {
      this.formGroup.setValue(this.initialUserCheckoutInfo);
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group(<{ [p in keyof IUserCheckoutInfo]: any }>{
      email: [
        this.authService.payload$$.getValue()?.email || '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      fullName: [
        '',
        [Validators.required],
      ],
      address: '',
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      creditCard: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      cvv: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ],
      ],
    }, {
      updateOn: 'submit',
    });
  }
}
