import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserCheckoutInfo, PersonalService } from '../../services/personal.service';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {

  totalPaymentAmount!: number
  mode!: 'edit' | 'view';
  formGroup!: FormGroup;
  private fb = new FormBuilder();
  private submitSubscription!: Subscription;
  private userCheckoutInfo!: IUserCheckoutInfo | null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private personalService: PersonalService,
  ) {}

  ngOnInit(): void {
    this.initUserCheckoutInfo();
    this.setTotalPaymentAmount();
    this.initFormGroup();
    this.patchFormGroup();
    this.setMode();
    this.onSubmit();
  }

  ngOnDestroy() {
    this.submitSubscription.unsubscribe();
  }

  get formValue() {
    return this.formGroup.value as IUserCheckoutInfo;
  }

  private setMode() {
    if (this.userCheckoutInfo) {
      this.mode = 'view'
    } else {
      this.mode = 'edit';
    }
  }

  private initUserCheckoutInfo() {
    this.userCheckoutInfo = this.personalService.userCheckoutInfo$$.getValue();
  }

  private setTotalPaymentAmount() {
    this.totalPaymentAmount = this.cartService.productList$$.getValue()
      .reduce((sum, product) => sum + product.price, 0);
  }

  private onSubmit() {
    this.submitSubscription = this.formGroup.valueChanges
      .pipe(
        filter(() => this.formGroup.valid)
      )
      .subscribe(this.personalService.userCheckoutInfo$$);
  }

  private patchFormGroup() {
    if (this.userCheckoutInfo) {
      this.formGroup.patchValue(this.userCheckoutInfo);
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
        '',
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
