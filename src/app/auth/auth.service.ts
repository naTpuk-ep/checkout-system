import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../layout/services/local-storage.service';


export interface ILoginPayload {
  email: string;
  pass: string;
}

const verificationLoginPayload: ILoginPayload = {
  email: 'Zen@sayollo.com',
  pass: '123456',
};

@Injectable()
export class AuthService {

  private readonly localStorageAuthKey = 'checkout-auth';
  payload$$!: BehaviorSubject<ILoginPayload | null>;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.initPayload();
    this.onPayloadChange();
  }

  whenLoggedIn(): Observable<boolean> {
    return this.payload$$.pipe(
      map(this.verify.bind(this)),
    );
  }

  onSubmit(payload$: Observable<ILoginPayload>) {
    payload$.subscribe(this.payload$$);
  }

  private logout() {
    this.localStorageService.remove(this.localStorageAuthKey);
    this.router.navigate(['auth']);
  }

  private login(payload: ILoginPayload) {
    this.localStorageService.set(payload, this.localStorageAuthKey);
    this.router.navigate(['']);
  }

  private initPayload() {
    this.payload$$ =
      new BehaviorSubject<ILoginPayload | null>(this.localStorageService.get(this.localStorageAuthKey));
  }

  private onPayloadChange() {
    this.payload$$.subscribe((payload) => {
      if (this.verify(payload)) {
        this.login(<ILoginPayload>payload);
      } else {
        this.logout();
      }
    });
  }

  private verify(payload: ILoginPayload | null) {
    return Object.entries(verificationLoginPayload)
      .every(([key, value]) => (
        payload && payload[<keyof ILoginPayload>key] === value
      ));
  }
}
