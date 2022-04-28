import { forwardRef, Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../layout/services/local-storage.service';
import { filter } from 'rxjs/operators';


export interface IUserCheckoutInfo {
  email: string;
  fullName: string;
  address: string;
  phone: string;
  creditCard: number;
  cvv: number;
}

@Injectable({
  providedIn: forwardRef(() => CoreModule),
})
export class PersonalService {

  private readonly userLocalStorageKey = 'user-checkout-info';
  userCheckoutInfo$$!: BehaviorSubject<IUserCheckoutInfo | null>;

  constructor(private localStorageService: LocalStorageService) {
    this.initUserCheckoutInfo();
    this.onUserInfoChange();
  }

  private onUserInfoChange() {
    this.userCheckoutInfo$$
      .pipe(filter((userInfo) => !!userInfo))
      .subscribe((userInfo) => {
      this.localStorageService.set(userInfo, this.userLocalStorageKey);
    });
  }

  private initUserCheckoutInfo() {
    this.userCheckoutInfo$$ =
      new BehaviorSubject(this.localStorageService.get(this.userLocalStorageKey));
  }
}
